 const environment = require('src/environments/environment');

const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults({
  static: './dist'
});

const port = environment.port || 3000;
server.use(middlewares);
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  })
);

server.use(router);
server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
