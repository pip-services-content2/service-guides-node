"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuidesHttpServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class GuidesHttpServiceV1 extends pip_services3_rpc_nodex_1.CommandableHttpService {
    constructor() {
        super('v1/guides');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-guides', 'controller', 'default', '*', '1.0'));
    }
}
exports.GuidesHttpServiceV1 = GuidesHttpServiceV1;
//# sourceMappingURL=GuidesHttpServiceV1.js.map