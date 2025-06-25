import express, { Express, Request, Response } from 'express';
import appRoute from '../route';
import { COMMON_ROUTE } from '../utils/route.enums';
import cors, { CorsOptions } from 'cors';
import responseWrapper from '../helpers/responseWrapper';

const app: Express = express();

const corsOpts: CorsOptions = {
  origin: '*',
};

app.use(cors(corsOpts));
app.use(express.json());

app.use(express.text({ type: 'application/xml' })); // Parse XML as raw text
app.use(express.text({ type: '*/*' }));

const handleSyntaxErrors = async (err: any, req: Request, res: Response, next) => {
  if (err instanceof SyntaxError && (<any>err).status === 400 && 'body' in err) {
    const r = responseWrapper(false, err?.message, 400, null, err);
    return res.status(400).send(r);
  }
  next();
};

app.use(handleSyntaxErrors);

app.get('/api/ping', (req, res, next) => res.send('PONG'));
app.use(COMMON_ROUTE.api, appRoute);

const handleNotFound = async (req: Request, res: Response, next) => {
  const data = {
    method: req.method,
    url: req.url,
  };
  const r = responseWrapper(false, 'CHECK API ROUTE AND METHOD.', 404, null, data);
  return res.json(r);
};

app.use('/', handleNotFound);

export default app;
