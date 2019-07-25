/**
 * Dependencies
 */
const config = require('./config');
const restify = require('restify');
const mongoose = require('mongoose');
const corsMiddleware = require('restify-cors-middleware');

/**
 * Initialize Server
 */
const server = restify.createServer({
  name: config.name,
  version: config.version,
});

/**
 * Middleware
 */
server.use(restify.plugins.jsonBodyParser({ mapParams: true }));
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser({ mapParams: true }));
server.use(restify.plugins.fullResponse());

const cors = corsMiddleware({ origins: config.allowedOrigins });
server.pre(cors.preflight);
server.use(cors.actual);

/**
 * Start Server, Connect to DB & Require Routes
 */
server.listen(config.port, () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(config.db.uri, { useNewUrlParser: true, autoIndex: false });

  const db = mongoose.connection;

  db.on('error', err => {
    console.error(err);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  });

  db.once('open', () => {
    require('../app/routes')(server);
    console.log(`Server is listening on port ${config.port}`);
  });
});
