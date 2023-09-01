import http from "node:http";
import { Transform } from "node:stream";

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformedChunk = Number(chunk.toString()) * -1;

    console.log({ transformedChunk });

    callback(null, Buffer.from(String(transformedChunk)));
  }
}

const server = http.createServer((request, response) => {
  return request.pipe(new InverseNumberStream()).pipe(response);
});

server.listen(3334);
