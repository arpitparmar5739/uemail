import path from 'path';
import open from 'open';
import webpack from 'webpack';
import express from 'express';
import config from '../webpack.config';
import webpack_dev_middleware from 'webpack-dev-middleware';
import webpack_hot_middleware from 'webpack-hot-middleware';

const port: number = 8080;
const app: express.Express = express();
const compiler: webpack.Compiler = webpack(config as webpack.Configuration);

app.use(webpack_dev_middleware(compiler, {
  publicPath: config.output!.publicPath || '/'
}));

app.use(webpack_hot_middleware(compiler));

app.get('*', (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, function (err: Error) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
