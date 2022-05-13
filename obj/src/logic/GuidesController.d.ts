import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { GuideV1 } from '../data/version1/GuideV1';
import { IGuidesController } from './IGuidesController';
export declare class GuidesController implements IConfigurable, IReferenceable, ICommandable, IGuidesController {
    private static _defaultConfig;
    private _dependencyResolver;
    private _persistence;
    private _attachmentsClient;
    private _attachmentsConnector;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getGuides(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<GuideV1>>;
    getRandomGuide(correlationId: string, filter: FilterParams): Promise<GuideV1>;
    getGuideById(correlationId: string, guideId: string): Promise<GuideV1>;
    createGuide(correlationId: string, guide: GuideV1): Promise<GuideV1>;
    updateGuide(correlationId: string, guide: GuideV1): Promise<GuideV1>;
    deleteGuideById(correlationId: string, guideId: string): Promise<GuideV1>;
}
