import {
  designation,
  designationList,
  getOneDesignation,
  updateDesignation,
} from '../services/designation';

export const createDesignation = async (req, res, next) => {
  const result = await designation(req, res, next);
  return res.json(result);
};
export const ListDesignation = async (req, res, next) => {
  const result = await designationList(req, res, next);
  return res.json(result);
};
export const designationOne = async (req, res, next) => {
  const result = await getOneDesignation(req, res, next);
  return res.json(result);
};
export const changeDesignation = async (req, res, next) => {
  const result = await updateDesignation(req, res, next);
  return res.json(result);
};
