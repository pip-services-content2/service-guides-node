import { DataPage, FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { TagsProcessor } from 'pip-services3-commons-nodex';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-nodex';

import { GuideV1 } from '../data/version1/GuideV1';
import { IGuidesPersistence } from './IGuidesPersistence';

export class GuidesMongoDbPersistence 
    extends IdentifiableMongoDbPersistence<GuideV1, string> 
    implements IGuidesPersistence {

    constructor() {
        super('guides');
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let criteria = [];

        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });

        let type = filter.getAsNullableString('type');
        if (type != null)
            criteria.push({ type: type });

        let app = filter.getAsNullableString('app');
        if (app != null)
            criteria.push({ app: app });

        let name = filter.getAsNullableString('name');
        if (name != null)
            criteria.push({ name: name });

        let status = filter.getAsNullableString('status');
        if (status != null)
            criteria.push({ status: status });

        // Search by tags
        let tags = filter.getAsObject('tags');
        if (tags) {
            let searchTags = TagsProcessor.compressTags([tags]);
            criteria.push({ all_tags: { $in: searchTags } });
        }

        return criteria.length > 0 ? { $and: criteria } : {};
    }

    public async getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<GuideV1>> {
        return await super.getPageByFilter(correlationId, this.composeFilter(filter), paging, '-create_time', null);
    }

    public async getOneRandom(correlationId: string, filter: FilterParams): Promise<GuideV1> {
        return await super.getOneRandom(correlationId, this.composeFilter(filter));
    }

}
