"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuidesMongoDbPersistence = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_mongodb_nodex_1 = require("pip-services3-mongodb-nodex");
class GuidesMongoDbPersistence extends pip_services3_mongodb_nodex_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('guides');
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_nodex_1.FilterParams();
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
            let searchTags = pip_services3_commons_nodex_2.TagsProcessor.compressTags([tags]);
            criteria.push({ all_tags: { $in: searchTags } });
        }
        return criteria.length > 0 ? { $and: criteria } : {};
    }
    getPageByFilter(correlationId, filter, paging) {
        const _super = Object.create(null, {
            getPageByFilter: { get: () => super.getPageByFilter }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.getPageByFilter.call(this, correlationId, this.composeFilter(filter), paging, '-create_time', null);
        });
    }
    getOneRandom(correlationId, filter) {
        const _super = Object.create(null, {
            getOneRandom: { get: () => super.getOneRandom }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.getOneRandom.call(this, correlationId, this.composeFilter(filter));
        });
    }
}
exports.GuidesMongoDbPersistence = GuidesMongoDbPersistence;
//# sourceMappingURL=GuidesMongoDbPersistence.js.map