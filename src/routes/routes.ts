import { Router } from 'express';
import { ping } from '../controllers/pingController';
import { regions } from '../controllers/regionsController';
import {
  incomeCategories,
  expenditureCategories,
} from '../controllers/CategoriesController';
import { assessAffordability } from '../controllers/affordabilityController';

const router = Router();

router.post('/api/ping', ping);

router.get('/api/regions', regions);

router.get('/api/categories/income', incomeCategories);

router.get('/api/categories/expenditure', expenditureCategories);

router.post('/api/affordability', assessAffordability);

export default router;
