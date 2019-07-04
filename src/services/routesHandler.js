const isUrl = require('is-url');
const randomString = require('randomstring');

const redisHandler = require('./redisHandler.js');

const origin = 'localhost:3000';

const generateStringAndTest = async () => new Promise(async (resolve) => {
  const identifier = randomString.generate(6);

  if (await redisHandler.asyncRead(identifier)) {
    return resolve(generateStringAndTest());
  }
  return resolve(identifier);
});

const newLink = async (ctx) => {
  const { url } = ctx.request.body;

  if (!url || !isUrl(url)) {
    return ctx.status = 400;
  }
  const { timeout } = ctx.request.body;

  if (timeout || timeout === 0) {
    if (!Number.isInteger(timeout) || (timeout < 1 || timeout > 86400)) {
      ctx.body = 'timeout has to be integer, higher than 1 and less than 86400';
      return ctx.status = 400;
    }

    const identifier = await generateStringAndTest();

    try {
      await redisHandler.asyncAdd(identifier, ctx.request.body.url, timeout);
      ctx.status = 200;
      return ctx.body = `${origin}/${identifier}`;
    } catch (e) {
      console.log(`ERR!${e}`);
      return ctx.status = 500;
    }
  }
};


const getLink = async (ctx) => {
  try {
    const res = await redisHandler.asyncRead(ctx.params.id);
    if (res) {
      ctx.redirect(res);
    } else {
      ctx.body = 'Unable to find';
      ctx.status = 404;
    }
  } catch (e) {
    // eslint-disable-next-line
    console.log(`Err!: ${e}`);
    ctx.status = 500;
    ctx.body = 'Internal error';
  }
};

module.exports = {
  newLink,
  getLink,
};
