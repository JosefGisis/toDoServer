exports.authenticate = function(req,res,next){
    const isValid = ''//validate request
    // If invalid 
    if(!isValid) return res.status(401).send()
    
    // validate JWT & add decoded values to req.authInfo
    next()
}