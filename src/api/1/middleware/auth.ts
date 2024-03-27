import { Strategy, ExtractJwt } from 'passport-jwt'
import { usersDB } from '../../../services/database'
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
			// Do I need to annotate user type. And when I pass it on, is the user important or is the jwt_payload important?
			const user = await usersDB.getUser(userId)
			if (!user) throw new Error('invalid user information')
			done(null, user, jwt_payload)
		} catch (error) {
			done(error, null)
		}
	})
)

export const authenticate = function () {
	return passport.authenticate('jwt', { session: false })
}

export { passport }
