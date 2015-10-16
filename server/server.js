var apiRouter = require('./routers/apiRouter');
var authRouter = require('./routers/authRouter');

app.use('/api', apiRouter);
app.use('/auth', authRouter);