# Link shortener API

Simple API for link shortening.

## Information

How to use:

API consists of two endpoints,

POST /api/new,

Example request:
```
{
  "url": "http://google.com",
  "timeout": 500
}
```
Url key is necessary, value has to be url string
Timeout (seconds that link will be active) is unnecessary, if not available, server will use default value. If provided, it has to be integer between 1 and 86400.

GET /:id

Get request with id returned from POST request redirects user to url provided in POST request.

To run development env, you will need Docker and docker-compose. Once installed run:

```
docker-compose build
docker-compose up
```

## Built With

* [Koa](http://www.dropwizard.io/1.0.2/docs/) - Web framework
* [Koa-router](https://github.com/alexmingoia/koa-router)
* [Redis](https://redis.io/) - In-memory db to store urls

## Todos

* Rate limiter for requests
* Production environment
