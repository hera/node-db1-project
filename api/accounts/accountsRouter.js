const express = require("express");
const accountsDb = require("../../data/accountsDb");
const { validateAccountData } = require("./accountsHelpers");

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


// Add an account

router.post("/", (req, res) => {
    if (!validateAccountData(req.body)) {
        res.status(400).json({
            error: "Bad request. Please provide valid name and budget.",
        });
    }

    accountsDb.insert({
        name: req.body.name,
        budget: req.body.budget
    })
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
            error: "Server error. Could not add an account.",
            description: error
        });
    });
});


// Edit (update) an account

router.put("/:id", (req, res) => {
    if (!validateAccountData(req.body)) {
        res.status(400).json({
            error: "Bad request. Please provide valid name and budget.",
        });
    }

    accountsDb.update(req.params.id, {
        name: req.body.name,
        budget: req.body.budget
    })
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
                error: "Server error. Could not update an account.",
                description: error
            });
        });
});


// Delete an account

router.delete("/:id", (req, res) => {
    accountsDb.remove(req.params.id)
        .then(rowsDeleted => {
            if (rowsDeleted) {
                res.status(200).json(rowsDeleted);
            } else {
                res.status(404).json({
                    error: `Not found. Could not delete an account with id ${req.params.id}`
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                error: "Server error. Could not delete an account.",
                description: error
            });
        });
});


module.exports = router;