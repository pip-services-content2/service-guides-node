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
exports.GuidesController = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const GuidesCommandSet_1 = require("./GuidesCommandSet");
const AttachmentsConnector_1 = require("./AttachmentsConnector");
class GuidesController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_nodex_2.DependencyResolver(GuidesController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
        this._attachmentsClient = this._dependencyResolver.getOneOptional('attachments');
        this._attachmentsConnector = new AttachmentsConnector_1.AttachmentsConnector(this._attachmentsClient);
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new GuidesCommandSet_1.GuidesCommandSet(this);
        return this._commandSet;
    }
    getGuides(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.getPageByFilter(correlationId, filter, paging);
        });
    }
    getRandomGuide(correlationId, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.getOneRandom(correlationId, filter);
        });
    }
    getGuideById(correlationId, guideId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.getOneById(correlationId, guideId);
        });
    }
    createGuide(correlationId, guide) {
        return __awaiter(this, void 0, void 0, function* () {
            let newGuide = null;
            guide.create_time = new Date();
            guide.all_tags = pip_services3_commons_nodex_3.TagsProcessor.extractHashTags('#title.en#title.sp#title.fr#title.de#title.ru#content.en#content.sp#content.fr#content.de#content.ru');
            newGuide = yield this._persistence.create(correlationId, guide);
            yield this._attachmentsConnector.addAttachments(correlationId, newGuide);
            return newGuide;
        });
    }
    updateGuide(correlationId, guide) {
        return __awaiter(this, void 0, void 0, function* () {
            let oldGuide = null;
            let newGuide = null;
            guide.all_tags = pip_services3_commons_nodex_3.TagsProcessor.extractHashTags('#title.en#title.sp#title.fr#title.de#title.ru#content.en#content.sp#content.fr#content.de#content.ru');
            oldGuide = yield this._persistence.getOneById(correlationId, guide.id);
            if (oldGuide == null) {
                throw new pip_services3_commons_nodex_4.NotFoundException(correlationId, 'GUIDE_NOT_FOUND', 'Guide ' + guide.id + ' was not found').withDetails('guide_id', guide.id);
            }
            newGuide = yield this._persistence.update(correlationId, guide);
            yield this._attachmentsConnector.updateAttachments(correlationId, oldGuide, newGuide);
            return newGuide;
        });
    }
    deleteGuideById(correlationId, guideId) {
        return __awaiter(this, void 0, void 0, function* () {
            let oldGuide = null;
            oldGuide = yield this._persistence.deleteById(correlationId, guideId);
            yield this._attachmentsConnector.removeAttachments(correlationId, oldGuide);
            return oldGuide;
        });
    }
}
exports.GuidesController = GuidesController;
GuidesController._defaultConfig = pip_services3_commons_nodex_1.ConfigParams.fromTuples('dependencies.persistence', 'service-guides:persistence:*:*:1.0', 'dependencies.attachments', 'pip-services-attachments:client:*:*:1.0');
//# sourceMappingURL=GuidesController.js.map