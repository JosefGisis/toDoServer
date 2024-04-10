import { Strategy, ExtractJwt } from 'passport-jwt'
import passport from 'passport'
import dotenv from 'dotenv'

import { usersDB } from '../../../services/database'

dotenv.config()

const options = {
	secretOrKey: process.env.JWT_KEY,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

passport.use(
	new Strategy(options, async (jwt_payload, done) => {
		try {
			const userId: number = jwt_payload.id
			const user = await usersDB.getUser(userId)
			if (!user) throw new Error('invalid user information')
			// user passes on ClientUser as user property in req
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
