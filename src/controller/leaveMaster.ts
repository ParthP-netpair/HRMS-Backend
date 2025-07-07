import {
  createLeaveRequest,
  updateLeaveRequest,
  getOneLeaveRequest,
  deleteLeaveRequest
} from '../services/leaveMaster';

export const leaveReqCreate = async (req, res, next) => {
  const result = await createLeaveRequest(req, res, next);
  return res.json(result);
};

export const leaveReqUpdate = async (req, res, next) => {
  const result = await updateLeaveRequest(req, res, next);
  return res.json(result);
};

export const leaveReqGetOne = async (req, res, next) => {
  const result = await getOneLeaveRequest(req, res, next);
  return res.json(result);
};

export const leaveReqDelete = async (req, res, next) => {
  const result = await deleteLeaveRequest(req, res, next);
  return res.json(result);
};
