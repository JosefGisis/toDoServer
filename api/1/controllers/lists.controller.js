exports.list = function(req,res,next){
    try {
        const { authInfo } = req

        const lists = db('lists').where({userId: authInfo.userId})
        
        res.send({data:lists})
    } catch (error) {
        next(error)
    }
}