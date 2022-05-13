const restify = require('restify');
const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { GuideV1 } from '../../../src/data/version1/GuideV1';
import { GuidesMemoryPersistence } from '../../../src/persistence/GuidesMemoryPersistence';
import { GuidesController } from '../../../src/logic/GuidesController';
import { GuidesHttpServiceV1 } from '../../../src/services/version1/GuidesHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let GUIDE1 = <GuideV1>{
    id: '1',
    name: 'Name1',
    type: 'introduction',
    app: 'Test App 1',
    max_ver: null,
    min_ver: null,
    status: 'new'
};
let GUIDE2 = <GuideV1>{
    id: '2',
    name: 'Name2',
    tags: ['TAG 1'],
    all_tags: ['tag1'],
    type: 'new release',
    app: 'Test App 1',
    max_ver: 1,
    min_ver: 2,
    status: 'new'
};

suite('GuidesHttpServiceV1', ()=> {
    let service: GuidesHttpServiceV1;

    let rest: any;

    suiteSetup(async () => {
        let persistence = new GuidesMemoryPersistence();
        let controller = new GuidesController();

        service = new GuidesHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('service-guides', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-guides', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-guides', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
    });
    
    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
    test('CRUD Operations', async () => {
        let guide1, guide2;

        // Create one guide
        let guide = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/guides/create_guide',
                {
                    guide: GUIDE1
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(guide);
        assert.equal(guide.type, GUIDE1.type);
        assert.equal(guide.app, GUIDE1.app);

        guide1 = guide;

        // Create another guide
        guide = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/guides/create_guide',
                {
                    guide: GUIDE2
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(guide);
        assert.equal(guide.type, GUIDE2.type);
        assert.equal(guide.app, GUIDE2.app);

        guide2 = guide;

        // Get all guides
        let page = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/guides/get_guides',
                {},
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Update the guide
        guide1.app = 'New App 1';
        guide = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/guides/update_guide',
                {
                    guide: guide1
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(guide);
        assert.equal(guide.app, 'New App 1');
        assert.equal(guide.type, GUIDE1.type);

        guide1 = guide;

        // Delete guide
        await new Promise<any>((resolve, reject) => {
            rest.post('/v1/guides/delete_guide_by_id',
                {
                    guide_id: guide1.id
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        // Try to get delete guide
        guide = await await new Promise<any>((resolve, reject) => {
            rest.post('/v1/guides/delete_guide_by_id',
                {
                    guide_id: guide1.id
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });


        // assert.isNull(guide || null);
    });
});