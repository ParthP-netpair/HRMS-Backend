import { createLeaveRequest } from '../services/leaveMaster';

export const leaveReqCreate = async (req, res, next) => {
  const result = await createLeaveRequest(req, res, next);
  return res.json(result);
};
