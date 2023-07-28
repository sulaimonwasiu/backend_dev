const app = require('./app'); // the actual Express application
const config = require('./utils/config');
const logger = require('./utils/logger');




const PORT = config.PORT;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});