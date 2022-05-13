import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IGetter } from 'pip-services3-data-nodex';
import { IWriter } from 'pip-services3-data-nodex';
import { GuideV1 } from '../data/version1/GuideV1';
export interface IGuidesPersistence extends IGetter<GuideV1, string>, IWriter<GuideV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<GuideV1>>;
    getOneRandom(correlationId: string, filter: FilterParams): Promise<GuideV1>;
    getOneById(correlationId: string, id: string): Promise<GuideV1>;
    create(correlationId: string, item: GuideV1): Promise<GuideV1>;
    update(correlationId: string, item: GuideV1): Promise<GuideV1>;
    deleteById(correlationId: string, id: string): Promise<GuideV1>;
}
