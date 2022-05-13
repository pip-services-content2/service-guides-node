import { ConfigParams } from 'pip-services3-commons-nodex';
import { JsonFilePersister } from 'pip-services3-data-nodex';

import { GuidesMemoryPersistence } from './GuidesMemoryPersistence';
import { GuideV1 } from '../data/version1/GuideV1';

export class GuidesFilePersistence extends GuidesMemoryPersistence {
	protected _persister: JsonFilePersister<GuideV1>;

    public constructor(path?: string) {
        super();

        this._persister = new JsonFilePersister<GuideV1>(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        this._persister.configure(config);
    }

}