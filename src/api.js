const express = require('express');
require('express-async-errors');
const errorsMiddleware = require('./middlewares/errors');
const authRouter = require('./routers/auth.routes');
const blogPostsRouter = require('./routers/blogPosts.routes');
const categoriesRouter = require('./routers/categories.routes');
const userRouter = require('./routers/user.routes');

// ...

const app = express();

app.use(express.json());

// ...

app.use('/login', authRouter);
app.use('/user', userRouter);
app.use('/categories', categoriesRouter);
app.use('/post', blogPostsRouter);

app.use(errorsMiddleware);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
