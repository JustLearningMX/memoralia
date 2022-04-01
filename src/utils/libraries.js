// Retorna un número aleatorio entre min (incluido) y max (excluido)
export function getRandomArbitrary(min, max) {
return Math.floor(Math.random() * (max - min)) + min;
}
  
const listOfMinFactors = [];
const listOfMaxFactors = [];
let listOfAllFactors = [];
export function getNumbersFactorsOfANumber(numCards, minFactor){

// const lastMinFactor = listOfMinFactors.length > 0 ? listOfMinFactors[listOfMinFactors.length-1] : null;
const lastMaxFactor = listOfMaxFactors.length > 0 ? listOfMaxFactors[listOfMinFactors.length-1] : undefined;

if(minFactor >= lastMaxFactor ){
    listOfAllFactors = [[...listOfMinFactors], [...listOfMaxFactors]];
    return listOfAllFactors;
} else {

    const residual = numCards % minFactor;
    const maxFactor = numCards / minFactor;

    if(residual === 0){
    listOfMinFactors.push(minFactor);
    listOfMaxFactors.push(maxFactor);
    }

    minFactor++;
    return getNumbersFactorsOfANumber(numCards, minFactor);
}  
}