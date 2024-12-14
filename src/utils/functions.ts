export const validateEquation = (equation: string): boolean => {
    const validPattern = /^[0-9x+\-*/^().\s]+$/;
    return validPattern.test(equation);
};