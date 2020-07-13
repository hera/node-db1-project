
function validateAccountData (data) {
    let isValid = false;

    if (
        data.name &&
        typeof(data.name) === "string" &&
        data.budget &&
        typeof(data.budget) === "number"
    ) {
        isValid = true;
    }

    return isValid;
}

module.exports = {
    validateAccountData
};