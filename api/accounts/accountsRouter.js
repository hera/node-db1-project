const express = require("express");
const accountsDb = require("../../data/accountsDb");

const router = express.Router();

router.get("/", (req, res) => {
    accountsDb.get()
        .then(accounts => {
            res.status(200).json(accounts);
        })
        .catch(error => {
            res.status(500).json({
                error: "Server error. Could not get all accounts.",
                description: error
            });
        });
});


module.exports = router;