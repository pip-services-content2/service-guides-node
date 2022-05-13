const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';

import { GuideV1 } from '../../src/data/version1/GuideV1';
import { GuidesLambdaFunction } from '../../src/container/GuidesLambdaFunction';

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

suite('GuidesLambdaFunction', ()=> {
    let lambda: GuidesLambdaFunction;

    suiteSetup(async () => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'service-guides:persistence:memory:default:1.0',
            'controller.descriptor', 'service-guides:controller:default:default:1.0'
        );

        lambda = new GuidesLambdaFunction();
        lambda.configure(config);
        await lambda.open(null);
    });
    
    suiteTeardown(async () => {
        await lambda.close(null);
    });
    
    test('CRUD Operations', async () => {
        let guide1, guide2;

        // Create one guide
        let guide = await lambda.act(
            {
                role: 'guides',
                cmd: 'create_guide',
                guide: GUIDE1
            }
        );

        assert.isObject(guide);
        assert.equal(guide.type, GUIDE1.type);
        assert.equal(guide.app, GUIDE1.app);

        guide1 = guide;

        // Create another guide
        guide = await lambda.act(
            {
                role: 'guides',
                cmd: 'create_guide',
                guide: GUIDE2
            }
        );

        assert.isObject(guide);
        assert.equal(guide.type, GUIDE2.type);
        assert.equal(guide.app, GUIDE2.app);

        guide2 = guide;

        // Get all guides
        let page = await lambda.act(
            {
                role: 'guides',
                cmd: 'get_guides'
            }
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Update the guide
        guide1.app = 'New App 1';

        guide = await lambda.act(
            {
                role: 'guides',
                cmd: 'update_guide',
                guide: guide1
            }
        );

        assert.isObject(guide);
        assert.equal(guide.app, 'New App 1');
        assert.equal(guide.type, GUIDE1.type);

        guide1 = guide;

        // Delete guide
        await lambda.act(
            {
                role: 'guides',
                cmd: 'delete_guide_by_id',
                guide_id: guide1.id
            }
        );

        // Try to get delete guide
        guide = await lambda.act(
            {
                role: 'guides',
                cmd: 'get_guide_by_id',
                guide_id: guide1.id
            }
        );

        assert.isNull(guide || null);
    });
});