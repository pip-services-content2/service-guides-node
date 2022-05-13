import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableLambdaFunction } from 'pip-services3-aws-nodex';
import { GuidesServiceFactory } from '../build/GuidesServiceFactory';

export class GuidesLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("guides", "System guides function");
        this._dependencyResolver.put('controller', new Descriptor('service-guides', 'controller', 'default', '*', '*'));
        this._factories.add(new GuidesServiceFactory());
    }
}

export const handler = new GuidesLambdaFunction().getHandler();