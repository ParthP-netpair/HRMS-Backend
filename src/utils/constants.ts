import mongoose, { SchemaOptions } from 'mongoose';

export enum COLLECTIONS {
  User = 'user',
  Pincode = 'pincode',
  Ticket = 'ticket',
  ChildTicket = 'child_ticket',
  TempProspectiveProvider = 'temp_prospective_provider',
  TempEmpanelment = 'temp_empanelment',
  Qualification = 'qualification',
  Council = 'council',
  ExternalVerification = 'external_verification',
  TestCategory = 'test_category',
  TestMaster = 'test_master',
  OwnershipType = 'ownership_type',
  InsuranceCompany = 'insurance_company',
  Provider = 'provider',
  ProviderLabTest = 'provider_lab_test',
  ProviderStaff = 'provider_staff',
  ProviderInsurer = 'provider_insurer',
  DelistRequest = 'delist_request',
  TempEmpanelEditTrack = 'temp_empanel_edit_track',
  ProviderInsurerRequest = 'provider_insurer_request',
  PartialEmpanelment = 'partial_empanelment',
  DispositionRemark = 'disposition_remark',
}

export const commonDbFields = {
  createdBy: { type: mongoose.Schema.ObjectId, ref: COLLECTIONS.User },
  updatedBy: { type: mongoose.Schema.ObjectId, ref: COLLECTIONS.User },
  deletedBy: { type: mongoose.Schema.ObjectId, ref: COLLECTIONS.User },
  deletedAt: { type: Date },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
};

export const schemaOptions: SchemaOptions = { timestamps: true, toJSON: { versionKey: false } };

