import {
  createLeaveMangement,
  updateLeaveMangement,
  getOneLeaveMangement,
  deleteLeaveMangement,
} from '../services/leaveManagement';

export const leaveMangementCreate = async (req, res, next) => {
  const result = await createLeaveMangement(req, res, next);
  return res.json(result);
};

export const leaveMangementUpdate = async (req, res, next) => {
  const result = await updateLeaveMangement(req, res, next);
  return res.json(result);
};
export const leaveMangementGetOne = async (req, res, next) => {
  const result = await getOneLeaveMangement(req, res, next);
  return res.json(result);
};
export const leaveMangementDelete = async (req, res, next) => {
  const result = await deleteLeaveMangement(req, res, next);
  return res.json(result);
};
