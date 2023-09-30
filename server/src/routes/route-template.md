import { Router, Request, Response, NextFunction } from "express";

/**
* ABOUT: 
* 
* Made with route-template.md
*/

const router = Router();

/**
 * -------------- POST ROUTES ----------------
 */


  /**
 * -------------- GET ROUTES ----------------
 */

  /**
 * -------------- OTHER ROUTES ----------------
 */

// Testing
router.get("/ping", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "Pong" });
});

module.exports = router;