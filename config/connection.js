const { connect, connection } = require('mongoose');

const connectionString = 'mongodb://localhost:27017/usersDB';

connect(connectionString);

module.exports = connection;
