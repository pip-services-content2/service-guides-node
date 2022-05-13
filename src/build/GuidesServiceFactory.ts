import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';

import { GuidesMongoDbPersistence } from '../persistence/GuidesMongoDbPersistence';
import { GuidesFilePersistence } from '../persistence/GuidesFilePersistence';
import { GuidesMemoryPersistence } from '../persistence/GuidesMemoryPersistence';
import { GuidesController } from '../logic/GuidesController';
import { GuidesHttpServiceV1 } from '../services/version1/GuidesHttpServiceV1';

export class GuidesServiceFactory extends Factory {
	public static Descriptor = new Descriptor("service-guides", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("service-guides", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("service-guides", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("service-guides", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("service-guides", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("service-guides", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(GuidesServiceFactory.MemoryPersistenceDescriptor, GuidesMemoryPersistence);
		this.registerAsType(GuidesServiceFactory.FilePersistenceDescriptor, GuidesFilePersistence);
		this.registerAsType(GuidesServiceFactory.MongoDbPersistenceDescriptor, GuidesMongoDbPersistence);
		this.registerAsType(GuidesServiceFactory.ControllerDescriptor, GuidesController);
		this.registerAsType(GuidesServiceFactory.HttpServiceDescriptor, GuidesHttpServiceV1);
	}
	
}
