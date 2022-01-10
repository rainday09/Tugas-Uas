// create connection for Harper DB
const harperive = require("harperive");
const configuration = {
    username: process.env.HARPER_INSTANCE_USERNAME,
    password: process.env.HARPER_INSTANCE_PASSWORD,
    schema: process.env.HARPER_INSTANCE_SCHEMA,
    harperHost: process.env.HARPER_HOST_INSTANCE_URL,
};
const db = new harperive.Client(configuration);
module.exports = db;