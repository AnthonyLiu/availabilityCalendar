import * as AvailabilityModel from '../models/availability';
import { NextFunction, Request, Response, Router } from 'express';
const router: Router = Router();

/**
 * create a new availability
 */
// TODO: need authentication before creating, create an auth service is a good method
router.post('/:userId', (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.weekNumber || !req.body.availability) {
    /**
     * For error messages,
     * 1, if this is BFF layer and only serve one frontend, I prefer to give readable messages, then the frontend don't need to process the message again
     * 2, if this is a public API, I would prefer to give a generic message because different frontend might have different request on show messages
     */
    return res.status(422).json({ errors: { message: "userId, weekNumber and availability are mandatory parameter" } });
  }

  // user model to create record in DB
  try {
    AvailabilityModel.create(req.body.userId, req.body.weekNumber, req.body.availability);
  } catch (error) {
    res.status(409).json({ errors: { message: "created failure with unknown errors, try again later." } });
  }
  res.sendStatus(201); // response with successful code
});


export const AvailabilityRoutes: Router = router;
