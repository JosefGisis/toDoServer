const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const { users } = require('../../../src/services/database')
module.exports.init = function (passport) {
	return passport.use(
		new JWTstrategy(
			{
				secretOrKey: process.env.JWT_KEY,
				jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
			},
			async (jwt_payload, done) => {
				try {
					const userId = jwt_payload.id
					const user = await users.getUser({id:userId})
					if (!user) throw new Error('Missing user')
					done(null, user, jwt_payload)
				} catch (error) {
					done(error, null)
				}
			}
		)
	)
}

module.exports.authenticate = function (passport) {
	return passport.authenticate('jwt', { session: false })
	// function (req, res, next) {
	// 	passport.authenticate('jwt', { session: false }, (err, userId) => {
	// 		if (err) return res.status(401).json({status: 401, message: 'invalid authorization', data: null})
	// 		req.authInfo = {users_id: userId}
	// 		next()
	// 	})(req, res, next)
	// }
}
