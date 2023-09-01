import http from "node:http";
import { JSONMiddleware } from "./middlewares/json.js";
import { Database } from "./database.js";

const database = new Database();

const listUser = async (request, response) => {
  const { method, url } = request;

  await JSONMiddleware(request, response);

  const isUserURL = url === "/users";
  const isListMethod = method === "GET" && isUserURL;
  const isCreateMethod = method === "POST" && isUserURL;

  if (isListMethod) {
    const users = database.select("users");
    return response.end(JSON.stringify(users));
  }

  if (isCreateMethod) {
    const { name, email } = request.body;

    const user = {
      id: 1,
      name,
      email,
    };

    database.insert("users", user);

    return response.writeHead(201).end();
  }

  return response.writeHead(404).end();
};

const server = http.createServer(listUser);
server.listen(3333);
