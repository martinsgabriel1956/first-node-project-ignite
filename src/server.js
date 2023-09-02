import http from "node:http";

import { JSONMiddleware } from "./middlewares/json.js";
import { routes } from "./routes.js";
import { extractQueryParams } from './utils/extract-query-params.js';

const listUser = async (request, response) => {
  const { method, url } = request;

  await JSONMiddleware(request, response);

  const route = routes.find(
    (route) => route.method === method && route.path.test(url)
  );

  if (route) {
    const routeParams = request.url.match(route.path);
    const {query, ...params} = routeParams.groups;

    request.params = params;
    request.query = query ? extractQueryParams(query) : {};

    return route.handler(request, response);
  }

  return response.writeHead(404).end();
};

const server = http.createServer(listUser);
server.listen(3333);
