import { Request, Response } from "express"
import {SqlEntityManager} from "@mikro-orm/postgresql";
export type MyContext = {
    em: SqlEntityManager,
    req: Request,
    res: Response,
    payload?: { username: string }
}