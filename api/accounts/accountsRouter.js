const express = require("express");
const accountsDb = require("../../data/accountsDb");

const router = express.Router();


// Get all accounts

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


// Get an account by id

router.get("/:id", (req, res) => {
    accountsDb.getById(req.params.id)
        .then(accounts => {
            if (accounts.length) {
                res.status(200).json(accounts);
            } else {
                res.status(404).json({
                    error: `Could not find an account with id ${req.params.id}`
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                error: "Server error. Could not get all accounts.",
                description: error
            });
        });
});


module.exports = router;