const { createServer } = require("http");
const next = require("next");
const { Server } = require("socket.io");

// const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("New client connected!");

    socket.on("new-order", (order) => {
      console.log("New order: ", order);
      io.emit("new-order", order);
    })

    socket.on("order-accepted", (order) => {
      console.log("Accepted order: ", order);
      io.emit("order-accepted", order);
    })

    socket.on("order-cancelled", (order) => {
      console.log("Rejected order: ", order);
      io.emit("order-cancelled", order);
    })

    socket.on("order-done", (order) => {
      console.log("Completed order: ", order);
      io.emit("order-done", order);
    })

    socket.on('disconnect', () => {
      console.log('Client disconnected!');
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
