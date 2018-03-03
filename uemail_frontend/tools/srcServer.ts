import * as express from 'express';
import * as path from 'path';
import * as webpack from 'webpack';

import config from '../webpack.config.dev';

import open = require('open');
import webpack_dev_middleware = require('webpack-dev-middleware');
import webpack_hot_middleware = require('webpack-hot-middleware');

const port: number = 3000;
const app = express();
const compiler = webpack(config);

app.use(webpack_dev_middleware(compiler, {
  publicPath: config.output.publicPath,
  stats: 'errors-only'
}));

app.use(webpack_hot_middleware(compiler));

app.get('*', (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

/* tslint:disable */

app.listen(port, function(err: Error) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});