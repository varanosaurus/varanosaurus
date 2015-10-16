var apiRouter = require('express').Router();

//sub-routers we'll delegate to
var userRouter = require('./userRouter');
var householdRouter = require('./householdRouter');
var reckoningRouter = require('./reckoningRouter');
var itemRouter = require('./itemRouter');

apiRouter.use('/users', userRouter);
apiRouter.use('/households', householdRouter);
apiRouter.use('/reckonings', reckoningRouter);
apiRouter.use('/items', itemRouter);

module.exports = apiRouter;