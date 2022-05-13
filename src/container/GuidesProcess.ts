import { ProcessContainer } from 'pip-services3-container-nodex';

import { GuidesServiceFactory } from '../build/GuidesServiceFactory';
import { DefaultRpcFactory } from 'pip-services3-rpc-nodex';
import { DefaultSwaggerFactory } from 'pip-services3-swagger-nodex';

export class GuidesProcess extends ProcessContainer {

    public constructor() {
        super("guides", "System guides microservice");
        this._factories.add(new GuidesServiceFactory);
        this._factories.add(new DefaultRpcFactory);
        this._factories.add(new DefaultSwaggerFactory);
    }

}
