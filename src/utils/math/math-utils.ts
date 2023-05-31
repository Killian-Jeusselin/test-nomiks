/**
 * function that return an array of value between a max and min
 * usefull for array and data representation
 * @param {number} min
 * @param {number} max
 * @param {number} stepsNumber
 * @return {number[]}
 */
export const getSteps = (min:number, max:number, stepsNumber:number): number[]=>{
    const stepSize = (max - min) / (stepsNumber - 1);
    return Array.from({ length: stepsNumber }, (_, i) => {
        const calc =  min + i* stepSize
        return parseFloat(calc.toFixed(2));
    });
}