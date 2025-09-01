export function calculateLtv(loanAmount : number, propertyValue: number): number {
    if(loanAmount <= 0){
        throw new Error("Loan amount must be greater than zero");
    }
    if(propertyValue <= 0){
        throw new Error("Property value must be greater than zero");
    }
    if(loanAmount > propertyValue){
        throw new Error("Loan value cannot exceed property value");
    }
    const ltv = (loanAmount / propertyValue) * 100;

    return Math.round(ltv*100) / 100;
}