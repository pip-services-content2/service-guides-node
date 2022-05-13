import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableHttpService } from 'pip-services3-rpc-nodex';

export class GuidesHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/guides');
        this._dependencyResolver.put('controller', new Descriptor('service-guides', 'controller', 'default', '*', '1.0'));
    }
}