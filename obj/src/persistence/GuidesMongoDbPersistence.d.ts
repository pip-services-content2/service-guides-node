import { DataPage, FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-nodex';
import { GuideV1 } from '../data/version1/GuideV1';
import { IGuidesPersistence } from './IGuidesPersistence';
export declare class GuidesMongoDbPersistence extends IdentifiableMongoDbPersistence<GuideV1, string> implements IGuidesPersistence {
    constructor();
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<GuideV1>>;
    getOneRandom(correlationId: string, filter: FilterParams): Promise<GuideV1>;
}
