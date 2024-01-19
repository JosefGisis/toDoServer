const passport = require('passport')
const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

passport.use(
	new JWTstrategy(
		{
			secretOrKey: process.env.JWT_KEY,
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
		},
		async (payload, done) => {
			const userId = payload.id
			done(null, userId, payload)
		}
	)
)

module.exports.authenticate = function (req, res, next) {
	passport.authenticate('jwt', { session: false }, (err, userId) => {
		if (err) return res.status(401).json({status: 401, message: 'invalid authorization', data: null})

		if (!userId) return res.status(401).json({status: 401, message: 'invalid authorization', data: null })
        
        req.body.authInfo = {users_id: userId}

		next()
	})(req, res, next)
}