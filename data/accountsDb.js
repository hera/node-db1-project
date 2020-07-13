const db = require("./dbConfig");

const TABLE_NAME = "accounts";

module.exports = {
    get,
    getById,
    insert,
    update
};


function get () {
    return db(TABLE_NAME);
}


function getById (id) {
    return db(TABLE_NAME).where({id});
}

function insert (account) {
    return db(TABLE_NAME)
        .insert(account)
        .then(ids => {
            return getById(ids[0]);
        });
}

function update (id, accountData) {
    return db(TABLE_NAME)
        .where({id})
        .update(accountData)
        .then(rows => {
            return getById(id);
        });
}