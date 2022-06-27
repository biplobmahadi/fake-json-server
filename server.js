const path = require("path");
const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

router.render = (req, res) => {
  res.jsonp({
    isSuccess: res.statusCode !== 404 ? true : false,
    data: res.statusCode !== 404 ? res.locals.data : null,
    message: res.statusCode !== 404 ? "Successfully done!" : "Error occurred!",
  });
};

const port = 5050;

server.listen(port, () => {
  console.log("JSON Server is running on port", port);
  console.log(`See: http://localhost:${port}`);
});
