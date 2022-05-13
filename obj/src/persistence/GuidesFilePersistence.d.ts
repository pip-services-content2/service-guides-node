import { ConfigParams } from 'pip-services3-commons-nodex';
import { JsonFilePersister } from 'pip-services3-data-nodex';
import { GuidesMemoryPersistence } from './GuidesMemoryPersistence';
import { GuideV1 } from '../data/version1/GuideV1';
export declare class GuidesFilePersistence extends GuidesMemoryPersistence {
    protected _persister: JsonFilePersister<GuideV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
