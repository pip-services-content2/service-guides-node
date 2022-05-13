"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuidesProcess = void 0;
const pip_services3_container_nodex_1 = require("pip-services3-container-nodex");
const GuidesServiceFactory_1 = require("../build/GuidesServiceFactory");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const pip_services3_swagger_nodex_1 = require("pip-services3-swagger-nodex");
class GuidesProcess extends pip_services3_container_nodex_1.ProcessContainer {
    constructor() {
        super("guides", "System guides microservice");
        this._factories.add(new GuidesServiceFactory_1.GuidesServiceFactory);
        this._factories.add(new pip_services3_rpc_nodex_1.DefaultRpcFactory);
        this._factories.add(new pip_services3_swagger_nodex_1.DefaultSwaggerFactory);
    }
}
exports.GuidesProcess = GuidesProcess;
//# sourceMappingURL=GuidesProcess.js.map