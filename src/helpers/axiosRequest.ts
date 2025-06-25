import axios from 'axios';
import logger from './logger';

export default async (config: axios.AxiosRequestConfig<any>) => {
  try {
    const response = await axios(config);
    return { success: true, response };
  } catch (error) {
    if (error?.status !== 404) {
      const logData: any = { config };
      if (error?.response) {
        logData.status = error?.response?.status;
        logData.data = error?.response?.data;
        logData.headers = error?.response?.headers;
      } else if (error?.request) {
        logData.request = error?.request;
      } else {
        logData.message = error?.message;
      }
      logger.error(`External api call failed for ${config?.url}: ${error?.message}`, {
        data: logData,
        log: 'error',
      });
    }
    return { success: false, error };
  }
};
