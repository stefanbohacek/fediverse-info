import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import indexRoute from './routes/index.js';
import nodeInfoRoute from './routes/node-info.js';
import postContextRoute from './routes/post-context.js';

const app = express();

app.use(compression());
app.use(express.static('public'));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/', indexRoute)
app.use('/node-info', nodeInfoRoute)
app.use('/post-context', postContextRoute)

export default app;
