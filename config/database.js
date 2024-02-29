const { DataSource } = require('typeorm');
const Task = require('../models/postEntity');

const dataSource = new DataSource({
    type: 'mysql',
    port: 3306,
    username: "root",
    password: "password",
    database: "todo",
    synchronize: true,
    entities: [Task],
});
dataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
module.exports = dataSource;
