import http from "node:http";

const users = [];

const listUser = async (request, response) => {
  const { method, url } = request;

  const buffers = [];

  for await (const chunk of request) {
    buffers.push(chunk);
  }

  try {
    request.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch (error) {
    request.body = null;
  }

  const isUserURL = url === "/users";
  const isListMethod = method === "GET" && isUserURL;
  const isCreateMethod = method === "POST" && isUserURL;

  if (isListMethod) {
    return response
      .setHeader("content-type", "application/json")
      .end(JSON.stringify(users));
  }

  if (isCreateMethod) {
    const { name, email } = request.body;

    const userBody = {
      id: 1,
      name,
      email,
    };

    users.push(userBody);

    return response.writeHead(201).end();
  }

  return response.writeHead(404).end();
};

const server = http.createServer(listUser);
server.listen(3333);
