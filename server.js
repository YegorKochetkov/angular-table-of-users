<<<<<<< HEAD
=======
 const environment = require('src/environments/environment');

>>>>>>> 9aeb4dd10906d89a27a4da33067cdf13f43ef0fe
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults({
  static: './dist'
});

const port = 3000;
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
