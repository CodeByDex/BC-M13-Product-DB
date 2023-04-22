async function SafeRequest(req, res, cb) {
    try {
       await cb(req, res);
    } catch (err) {
        console.log(err);
        res.status(500).json("Internal Error")
    }
}

module.exports = {
    SafeRequest: SafeRequest
}