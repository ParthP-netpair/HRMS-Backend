"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = require("../utils/constants");
const TempEmpanelEditTrackSchema = new mongoose_1.Schema(Object.assign({ tempEmpanelId: { type: mongoose_1.Schema.Types.ObjectId, ref: constants_1.COLLECTIONS.TempEmpanelment }, previousData: mongoose_1.Schema.Types.Mixed, updatedData: mongoose_1.Schema.Types.Mixed, updatedByDc: Boolean }, constants_1.commonDbFields), constants_1.schemaOptions);
const TempEmpanelEditTrack = (0, mongoose_1.model)('TempEmpanelEditTrack', TempEmpanelEditTrackSchema, constants_1.COLLECTIONS.TempEmpanelEditTrack);
exports.default = TempEmpanelEditTrack;
