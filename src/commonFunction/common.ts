import { Types } from 'mongoose';
import LeaveMasters from '../model/leaveMaster';

interface CheckLeaveOverlapParams {
  userId: string | Types.ObjectId;
  leaveManagementId: string | Types.ObjectId;
  fromDate: string | Date;
  toDate?: string | Date | null;
}

export const checkLeaveOverlap = async ({
  userId,
  leaveManagementId,
  fromDate,
  toDate,
}: CheckLeaveOverlapParams) => {
  const newFromDate = new Date(fromDate);
  const newToDate = toDate ? new Date(toDate) : new Date(fromDate); // Default toDate = fromDate

  return await LeaveMasters.findOne({
    userId,
    leaveManagementId,
    fromDate: { $lte: newToDate },
    toDate: { $gte: newFromDate },
  });
};
