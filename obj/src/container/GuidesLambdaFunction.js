"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.GuidesLambdaFunction = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_aws_nodex_1 = require("pip-services3-aws-nodex");
const GuidesServiceFactory_1 = require("../build/GuidesServiceFactory");
class GuidesLambdaFunction extends pip_services3_aws_nodex_1.CommandableLambdaFunction {
    constructor() {
        super("guides", "System guides function");
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-guides', 'controller', 'default', '*', '*'));
        this._factories.add(new GuidesServiceFactory_1.GuidesServiceFactory());
    }
}
exports.GuidesLambdaFunction = GuidesLambdaFunction;
exports.handler = new GuidesLambdaFunction().getHandler();
//# sourceMappingURL=GuidesLambdaFunction.js.map