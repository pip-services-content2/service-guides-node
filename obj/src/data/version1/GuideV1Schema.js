"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuideV1Schema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const GuidePageV1Schema_1 = require("./GuidePageV1Schema");
class GuideV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        /* Identification */
        this.withOptionalProperty('id', pip_services3_commons_nodex_3.TypeCode.String);
        this.withRequiredProperty('type', pip_services3_commons_nodex_3.TypeCode.String);
        this.withOptionalProperty('app', pip_services3_commons_nodex_3.TypeCode.String);
        this.withOptionalProperty('name', pip_services3_commons_nodex_3.TypeCode.String);
        this.withOptionalProperty('min_ver', pip_services3_commons_nodex_3.TypeCode.Integer);
        this.withOptionalProperty('max_ver', pip_services3_commons_nodex_3.TypeCode.Integer);
        /* Generic request properties */
        this.withOptionalProperty('create_time', pip_services3_commons_nodex_3.TypeCode.DateTime); //TypeCode.DateTime);
        /* Content */
        this.withOptionalProperty('pages', new pip_services3_commons_nodex_2.ArraySchema(new GuidePageV1Schema_1.GuidePageV1Schema()));
        /* Search */
        this.withOptionalProperty('tags', new pip_services3_commons_nodex_2.ArraySchema(pip_services3_commons_nodex_3.TypeCode.String));
        this.withOptionalProperty('all_tags', new pip_services3_commons_nodex_2.ArraySchema(pip_services3_commons_nodex_3.TypeCode.String));
        /* Status */
        this.withOptionalProperty('status', pip_services3_commons_nodex_3.TypeCode.String);
        /* Custom fields */
        this.withOptionalProperty('custom_hdr', null);
        this.withOptionalProperty('custom_dat', null);
    }
}
exports.GuideV1Schema = GuideV1Schema;
//# sourceMappingURL=GuideV1Schema.js.map