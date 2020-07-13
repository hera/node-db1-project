const accountsDb = require("../../data/accountsDb");

module.exports = {
    validateAccountData,
    isAccountNameUnique
};

function validateAccountData (req, res, next) {
    const data = req.body;

    if (
        data.name &&
        typeof(data.name) === "string" &&
        data.budget &&
        typeof(data.budget) === "number"
    ) {
        next();
    } else {
        res.status(400).json({
            error: "Bad request. Please provide valid name and budget.",
        });
    }
}

// Check if there are no accounts with the same name

function isAccountNameUnique (req, res, next) {
    accountsDb.getByName(req.body.name)
        .then(accounts => {
            if (!accounts.length) {
                next();
            } else {
                res.status(400).json({
                    error: "Account name already exists."
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                error: "Server error. Could not get all accounts.",
                description: error
            });
        });
}