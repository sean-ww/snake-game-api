module.exports = {
  name: 'API',
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 4040,
  base_url: process.env.BASE_URL || 'http://localhost:4040',
  db: {
    uri: process.env.MONGODB_URI || 'mongodb://mongodb:27017/api',
  },
  allowedOrigins: ['http://localhost:8282'],
};
