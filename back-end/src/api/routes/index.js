const loginRoute = require('./login.route');
const userRoute = require('./user.route');
const productRoute = require('./product.route');

const appRouter = (app) => {
  app.use('/login', loginRoute);
  app.use('/register', userRoute);
  app.use('/products', productRoute);
};

module.exports = appRouter;