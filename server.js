import { create, router as _router, defaults, rewriter } from "json-server";

const server = create();
const router = _router('./db.json');
const middlewares = defaults({
  static: './dist'
});

const port = 3000;
server.use(middlewares);
server.use(
  rewriter({
    "/api/*": "/$1",
  })
);

server.use(router);
server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
