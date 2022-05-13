import { GuidesMemoryPersistence } from '../../src/persistence/GuidesMemoryPersistence';
import { GuidesPersistenceFixture } from './GuidesPersistenceFixture';

suite('GuidesMemoryPersistence', ()=> {
    let persistence: GuidesMemoryPersistence;
    let fixture: GuidesPersistenceFixture;
    
    setup(async () => {
        persistence = new GuidesMemoryPersistence();
        fixture = new GuidesPersistenceFixture(persistence);
        
        await persistence.open(null);
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