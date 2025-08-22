import { Request, Response, NextFunction } from 'express';
import { IncomeCategory } from '../models/categories/incomeCategory';
import { ExpenditureCategory } from '../models/categories/expenditureCategory';

export const incomeCategories = (
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
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

export const expenditureCategories = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const categories: ExpenditureCategory[] = [
    { id: 100, name: 'Council Tax', description: 'Money I pay to the Council' },
  ];
  try {
    res.json(categories);
  } catch (error) {
    next(error);
  }
};
