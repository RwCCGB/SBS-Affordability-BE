import { Request, Response, NextFunction } from 'express';
import { IncomeCategory } from '../models/categories/incomeCategory';
import { ExpenditureCategory } from '../models/categories/expenditureCategory';
import { getExpenditureTypes, getIncomeTypes } from '../services/factories/factory';
export const incomeCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const categories: IncomeCategory[] = [
    {
      id: 100,
      name: 'Salary',
      description: 'Money given to me by my Employer',
    },
  ];
  try {
    const service = getIncomeTypes();
    const data = await service.getAll();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const expenditureCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const categories: ExpenditureCategory[] = [
    { id: 100, name: 'Council Tax', description: 'Money I pay to the Council' },
  ];
  try {
    const service = getExpenditureTypes();
    const data = await service.getAll();
    res.json(data);
  } catch (error) {
    next(error);
  }
};
