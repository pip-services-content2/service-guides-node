const assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';

import { IGuidesPersistence } from '../../src/persistence/IGuidesPersistence';
import { GuideV1 } from '../../src/data/version1/GuideV1';

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
let GUIDE3 = <GuideV1>{
    id: '3',
    name: 'Name3',
    tags: ['Tag 1', 'tag 2'],
    all_tags: ['tag1', 'tag2'],
    type: 'new release',
    app: 'Test App 2',
    max_ver: 1,
    min_ver: 3,
    status: 'translating'
};

export class GuidesPersistenceFixture {
    private _persistence: IGuidesPersistence;
    
    constructor(persistence: IGuidesPersistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    public async createGuides() {
        // Create one guide
        let guide = await this._persistence.create(null, GUIDE1);

        assert.isObject(guide);
        assert.equal(guide.status, 'new');
        assert.equal(guide.type, GUIDE1.type);

        // Create another guide
        guide = await this._persistence.create(null, GUIDE2);

        assert.isObject(guide);
        assert.equal(guide.status, 'new');
        assert.equal(guide.type, GUIDE2.type);

        // Create yet another guide
        guide = await this._persistence.create(null, GUIDE3);

        assert.isObject(guide);
        assert.equal(guide.status, GUIDE3.status);
        assert.equal(guide.type, GUIDE3.type);
    }
                
    public async testCrudOperations() {
        let guide1: GuideV1;

        // Create items
        await this.createGuides();

        // Get all guides
        let page = await this._persistence.getPageByFilter(null, new FilterParams(), new PagingParams());

        assert.isObject(page);
        assert.lengthOf(page.data, 3);

        guide1 = page.data[0];

        // Update the guide
        guide1.app = 'New App 1';

        let guide = await this._persistence.update(null, guide1);

        assert.isObject(guide);
        assert.equal(guide.app, 'New App 1');
        assert.equal(guide.type, guide1.type);

        // Delete guide
        await this._persistence.deleteById(null, guide1.id);

        // Try to get delete guide
        guide = await this._persistence.getOneById(null, guide1.id);

        assert.isNull(guide || null);
    }

    public async testGetWithFilter() {
        // Create guides
        await this.createGuides();

        // Get guides filtered by tags
        let guides = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                tags: ['tag1']
            }), 
            new PagingParams()
        );

        assert.isObject(guides);
        assert.lengthOf(guides.data, 2);

        // Get guides filtered by status
        guides = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                type: GUIDE3.type,
                app: GUIDE3.app,
                name: GUIDE3.name
            }),
            new PagingParams()
        );

        assert.isObject(guides);
        assert.lengthOf(guides.data, 1);
    }

    public async testGetRandom() {
        // Create guides
        await this.createGuides();

        // Get random guide filtered by tags
        let guide = await this._persistence.getOneRandom(
            null,
            FilterParams.fromValue({
                tags: ['tag1'],
                status: 'new'
            })
        );

        assert.isObject(guide);
        assert.equal(GUIDE2.id, guide.id);
    }
}
