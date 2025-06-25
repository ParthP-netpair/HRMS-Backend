import getEnv from '../config/env.config';

export const asyncDelay = (ms?: number) => {
  const d = ms ? ms : Number(getEnv('TICKET_UPDATE_DELAY'));
  return new Promise(resolve => setTimeout(resolve, d));
};
