var apiRouter = require('express').Router();

//sub-routers we'll delegate to
var userRouter = require('./userRouter');
var householdRouter = require('./householdRouter');
var reckoningRouter = require('./reckoningRouter');
var itemRouter = require('./itemRouter');
var invitationRouter = require('./invitationRouter');

apiRouter.use('/users', userRouter);
apiRouter.use('/households', householdRouter);
apiRouter.use('/reckonings', reckoningRouter);
apiRouter.use('/items', itemRouter);
apiRouter.use('/invitations', invitationRouter);

module.exports = apiRouter;
