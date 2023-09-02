import http from "node:http";

import { JSONMiddleware } from "./middlewares/json.js";
import { routes } from "./routes.js";

const listUser = async (request, response) => {
  const { method, url } = request;

  await JSONMiddleware(request, response);

  const route = routes.find(
    (route) => route.method === method && route.path.test(url)
  );

  if (route) {
    const routeParams = request.url.match(route.path);
    console.log(routeParams)
    return route.handler(request, response);
  }

  return response.writeHead(404).end();
};

const server = http.createServer(listUser);
server.listen(3333);
