const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const database = require('../../../services/database')
const passport = require('passport')

passport.use(
	new JWTstrategy(
		{
			secretOrKey: process.env.JWT_KEY,
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
		},
		async (jwt_payload, done) => {
			try {
				const userId = jwt_payload.id
				const user = await database.usersDB.getUser({ userId })
				if (!user) throw new Error('invalid user information')
				done(null, user, jwt_payload)
			} catch (error) {
				done(error, null)
			}
		}
	)
)

module.exports.authenticate = function () {
	return passport.authenticate('jwt', { session: false })
}

module.exports.passport = passport
