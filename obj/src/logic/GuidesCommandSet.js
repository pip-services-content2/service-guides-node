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
exports.GuidesCommandSet = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_6 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_7 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_8 = require("pip-services3-commons-nodex");
const GuideV1Schema_1 = require("../data/version1/GuideV1Schema");
class GuidesCommandSet extends pip_services3_commons_nodex_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetGuidesCommand());
        this.addCommand(this.makeGetRandomGuideCommand());
        this.addCommand(this.makeGetGuideByIdCommand());
        this.addCommand(this.makeCreateGuideCommand());
        this.addCommand(this.makeUpdateGuideCommand());
        this.addCommand(this.makeDeleteGuideByIdCommand());
    }
    makeGetGuidesCommand() {
        return new pip_services3_commons_nodex_2.Command("get_guides", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_nodex_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_nodex_8.PagingParamsSchema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let filter = pip_services3_commons_nodex_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_nodex_4.PagingParams.fromValue(args.get("paging"));
            return yield this._logic.getGuides(correlationId, filter, paging);
        }));
    }
    makeGetRandomGuideCommand() {
        return new pip_services3_commons_nodex_2.Command("get_random_guide", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_nodex_7.FilterParamsSchema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let filter = pip_services3_commons_nodex_3.FilterParams.fromValue(args.get("filter"));
            return yield this._logic.getRandomGuide(correlationId, filter);
        }));
    }
    makeGetGuideByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("get_guide_by_id", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('guide_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let guideId = args.getAsNullableString("guide_id");
            return yield this._logic.getGuideById(correlationId, guideId);
        }));
    }
    makeCreateGuideCommand() {
        return new pip_services3_commons_nodex_2.Command("create_guide", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('guide', new GuideV1Schema_1.GuideV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let guide = args.get("guide");
            return yield this._logic.createGuide(correlationId, guide);
        }));
    }
    makeUpdateGuideCommand() {
        return new pip_services3_commons_nodex_2.Command("update_guide", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('guide', new GuideV1Schema_1.GuideV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let guide = args.get("guide");
            return yield this._logic.updateGuide(correlationId, guide);
        }));
    }
    makeDeleteGuideByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("delete_guide_by_id", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('guide_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let guideId = args.getAsNullableString("guide_id");
            return yield this._logic.deleteGuideById(correlationId, guideId);
        }));
    }
}
exports.GuidesCommandSet = GuidesCommandSet;
//# sourceMappingURL=GuidesCommandSet.js.map