const express = require('express');
const postsRouter = require('./router/posts-router');
const server = express();

const logger = require('./middleware/middleware');

// remember express by default cannot parse JSON in request bodies
server.use(express.json());
// global middlewares and the user's router need to be connected here
server.use(logger);
server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use((req, res, next)=>{
  res.status(404).send('<h1>Sorry no page for that here</h1>');
  next();
})

module.exports = server;