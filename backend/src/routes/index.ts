import { Router } from 'express';
import { AvailabilityRoutes } from './availability';


const router: Router = Router();


// define a route handler for the default home page
router.get("/", (req, res) => {
  res.send("Sample response");
});
router.use('/availability', AvailabilityRoutes);


export const MainRouter: Router = router;