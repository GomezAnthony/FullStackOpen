const app = require('./app');
const config = require('./utils/config');
const logger = require('./utils/logger');

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
  console.log('NODE_ENV:', process.env.NODE_ENV);
});
