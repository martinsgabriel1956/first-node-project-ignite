import http from "node:http";

const listUser = (request, response) => {
  const { method, url } = request;

  const isUserURL = url === "/users";
  const isListMethod = method === "GET" && isUserURL;
  const isCreateMethod = method === "POST" && isUserURL;

  if (isListMethod) {
    return response.end("User list");
  }

  if (isCreateMethod) {
    return response.end("Create user");
  }

  return response.end("Hello World!");
};

const server = http.createServer(listUser);
server.listen(3333);
