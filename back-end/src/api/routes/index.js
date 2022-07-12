const loginRoute = require('./login.route');
const userRoute = require('./user.route');

const appRouter = (app) => {
  app.use('/login', loginRoute);
  app.use('/register', userRoute);
};

module.exports = appRouter;