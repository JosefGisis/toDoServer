import { Strategy, ExtractJwt } from 'passport-jwt'
import database from '../../../services/database'
import passport from 'passport'
import dotenv from 'dotenv'

dotenv.config()

const options = {
	secretOrKey: process.env.JWT_KEY,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

passport.use(
	new Strategy(options, async (jwt_payload, done) => {
		try {
			const userId = jwt_payload.id
			const user = await database.usersDB.getUser({ userId })
			if (!user) throw new Error('invalid user information')
			done(null, user, jwt_payload)
		} catch (error) {
			done(error, null)
		}
	})
)

module.exports.authenticate = function () {
	return passport.authenticate('jwt', { session: false })
}

export { passport }
