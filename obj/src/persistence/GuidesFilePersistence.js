"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuidesFilePersistence = void 0;
const pip_services3_data_nodex_1 = require("pip-services3-data-nodex");
const GuidesMemoryPersistence_1 = require("./GuidesMemoryPersistence");
class GuidesFilePersistence extends GuidesMemoryPersistence_1.GuidesMemoryPersistence {
    constructor(path) {
        super();
        this._persister = new pip_services3_data_nodex_1.JsonFilePersister(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }
    configure(config) {
        super.configure(config);
        this._persister.configure(config);
    }
}
exports.GuidesFilePersistence = GuidesFilePersistence;
//# sourceMappingURL=GuidesFilePersistence.js.map