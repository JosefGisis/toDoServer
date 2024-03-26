import { Request, Response, NextFunction } from "express"

interface RequestWithUserId extends Request {
	user: {
		id: number
	}
}

export type RouteHandler = (req: RequestWithUserId, res: Response, next: NextFunction) => void | Promise<void>