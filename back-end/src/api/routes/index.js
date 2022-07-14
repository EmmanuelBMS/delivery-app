const loginRoute = require('./login.route');
const userRoute = require('./user.route');
const productRoute = require('./product.route');
const saleRoute = require('./sale.route');

const appRouter = (app) => {
  app.use('/login', loginRoute);
  app.use('/register', userRoute);
  app.use('/products', productRoute);
  app.use('/sales', saleRoute);
};

module.exports = appRouter;