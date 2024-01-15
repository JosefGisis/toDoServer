module.exports.authenticate = function (req, res, next) {
    req.body.authInfo = { users_id: 1}
    
    // const isValid = ''//validate request
    // // If invalid 
    // if(!isValid) return res.status(401).send()
    
    // // validate JWT & add decoded values to req.authInfo

    next()
}