const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const routesHandler = require('./services/routesHandler.js');

const app = new Koa();
const router = new Router();
app.use(bodyParser());


router.post('/api/new', routesHandler.newLink);

router.get('/:id', routesHandler.getLink);

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000);
