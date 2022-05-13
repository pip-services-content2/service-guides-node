"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuidePageV1Schema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
class GuidePageV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        this.withRequiredProperty('title', pip_services3_commons_nodex_2.TypeCode.Map);
        this.withOptionalProperty('content', pip_services3_commons_nodex_2.TypeCode.Map);
        this.withOptionalProperty('more_url', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('color', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('pic_id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('pic_uri', pip_services3_commons_nodex_2.TypeCode.String);
    }
}
exports.GuidePageV1Schema = GuidePageV1Schema;
//# sourceMappingURL=GuidePageV1Schema.js.map