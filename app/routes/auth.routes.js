const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const { authJwt } = require("../middlewares");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/auth/signup",
    // [
    //   verifySignUp.checkDuplicateUsernameOrEmail,
    //   verifySignUp.checkRolesExisted
    // ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
  app.get("/api/todos",[authJwt.verifyToken], controller.getTodos);
  app.post("/api/todos",[authJwt.verifyToken],controller.createTodo);
  app.put("/api/todos/:id",[authJwt.verifyToken], controller.updateTodo);
  app.delete("/api/todos/:id",[authJwt.verifyToken], controller.deleteTodo);
  app.get('/api/todos/:id', controller.getTodoById);
};
