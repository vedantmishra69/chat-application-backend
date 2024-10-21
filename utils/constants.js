const { v4: uuidv4 } = require('uuid');

const SECRET_FOR_JWT = uuidv4()

module.exports = { SECRET_FOR_JWT }