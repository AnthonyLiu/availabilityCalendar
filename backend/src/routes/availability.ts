import * as AvailabilityModel from '../models/availability';
import { NextFunction, Request, Response, Router } from 'express';
const router: Router = Router();

/**
 * create a new availability
 */
// TODO: need authentication before creating, create an auth service is a good method
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.userId || !req.body.year || !req.body.weekNumber  || !req.body.availability) {
    /**
     * For error messages,
     * 1, if this is BFF layer and only serve one frontend, I prefer to give readable messages, then the frontend don't need to process the message again
     * 2, if this is a public API, I would prefer to give a generic message because different frontend might have different request on show messages
     */
    return res.status(422).json({ errors: { message: "userId, year, weekNumber and availability are mandatory parameter" } });
  }

  /**
   * Here should have some business level rules validation, eg. time should be in the correct week number
   */

  const year = parseInt(req.body.year, 10);
  const weekNumber = parseInt(req.body.weekNumber, 10);

  // user model to create record in DB
  const isCreated = await AvailabilityModel.create(req.body.userId, year, weekNumber, req.body.availability);

  // TODO: need to be optimised with returning proper error messages
  if (isCreated) {
    res.sendStatus(201); // response with successful code
  } else {
    res.status(409).json({ errors: { message: "invalid request" } });
  }
});


export const AvailabilityRoutes: Router = router;
