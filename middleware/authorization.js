function test(req, res, next)  {
    console.log('custom middleware function is working!')
    next()
}

module.exports = test
