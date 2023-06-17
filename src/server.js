import http from "node:http";

const users = [];

const listUser = (request, response) => {
  const { method, url } = request;

  const isUserURL = url === "/users";
  const isListMethod = method === "GET" && isUserURL;
  const isCreateMethod = method === "POST" && isUserURL;

  if (isListMethod) {
    return response
      .setHeader("content-type", "application/json")
      .end(JSON.stringify(users));
  }

  if (isCreateMethod) {
    const userBody = {
      id: 1,
      name: "John Doe",
      email: "johndoes@email.com",
    };

    users.push(userBody);

    return response.writeHead(201).end();
  }

  return response.writeHead(404).end();
};

const server = http.createServer(listUser);
server.listen(3333);
