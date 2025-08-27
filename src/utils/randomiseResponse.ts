export function randomiseResponse() : "Success" | "Declined" | "Referred" {
    const random = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    if(random === 1){
        return "Success";
    }
    else if(random === 2){
        return "Declined";
    }
    else{
        return "Referred";
    }
}