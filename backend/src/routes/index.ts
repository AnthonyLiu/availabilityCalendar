import { Router } from 'express';
import { AvailabilityRoutes } from './availability';


const router: Router = Router();


router.use('/availability', AvailabilityRoutes);


export const MainRouter: Router = router;