import { Router, Request, Response, NextFunction } from "express";
import { app } from "../server"

/** 
 * This is a index file for all the routers
 * 
 * Route the other router files here then import this to server.ts 
*/

// ROUTES
app.use('/auth', require('./auth'));

const router = Router();

// Testing
router.get("/ping", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "Pong" });
});

module.exports = router;