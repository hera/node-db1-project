const db = require("./dbConfig");

const TABLE_NAME = "accounts";

module.exports = {
    get,
    getById
};


function get () {
    return db(TABLE_NAME);
}


function getById (id) {
    return db(TABLE_NAME).where({id});
}