export interface AffordabilityResponse {
  maximumLoanAllowed: number;
  date: Date;
  ltv: Number;
  result: AffordabilityResult;
}

export enum AffordabilityResult {
  Success = "Success",
  Referred = "Referred",
  Declined = "Declined",
}
