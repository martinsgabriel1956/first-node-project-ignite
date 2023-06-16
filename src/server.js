import http from "node:http";

const listUser = (request, response) => response.end("Hello World!");
const server = http.createServer(listUser);

server.listen(3333);
