import { GuidesFilePersistence } from '../../src/persistence/GuidesFilePersistence';
import { GuidesPersistenceFixture } from './GuidesPersistenceFixture';

suite('GuidesFilePersistence', ()=> {
    let persistence: GuidesFilePersistence;
    let fixture: GuidesPersistenceFixture;
    
    setup(async () => {
        persistence = new GuidesFilePersistence('./data/Guides.test.json');

        fixture = new GuidesPersistenceFixture(persistence);
        
        await persistence.open(null);
        await persistence.clear(null);
    });
    
    teardown(async () => {
        await persistence.close(null);
    });
        
    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

    test('Get with Filters', async () => {
        await fixture.testGetWithFilter();
    });

    test('Get Random', async () => {
        await fixture.testGetRandom();
    });

});