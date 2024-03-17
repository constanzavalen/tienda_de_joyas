import {Router} from 'express';
import { getOrderAndLimitJoyas, getAllJoyasWithHateoas, allJoyasPaginator, filterJoyas, joyasFilter } from '../controllers/joyas.controller.js';
const router = Router();

//router.get('/joyas', getALLJoyasLimit);
router.get('/joyas', getOrderAndLimitJoyas);
router.get('/joyas_with_hateoas', getAllJoyasWithHateoas);
router.get('/joyas_with_pagination', allJoyasPaginator);
router.get('/joyas_filters', filterJoyas);
router.get('/joyas/filters', joyasFilter);

export default router;