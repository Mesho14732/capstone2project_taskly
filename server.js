

const app = require('./app');
const { logger } = require('./src/utils');
const { envConfig } = require('./src/config/envConfig');


const port = envConfig.PORT || 3000;
app.set('port', port);

app.listen(port, () => {
    logger.info(`API is running on port ${port}`);
});

