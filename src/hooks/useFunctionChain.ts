import { useState } from 'react';
import { FunctionChain } from '../types';

export const useFunctionChain = (initialValue: number) => {
    const [functions, setFunctions] = useState<FunctionChain[]>([
        { id: 1, equation: 'x^2', input: initialValue, output: null, nextFunction: 2 },
        { id: 2, equation: '2x+4', input: null, output: null, nextFunction: 4 },
        { id: 3, equation: 'x^2+20', input: null, output: null, nextFunction: null },
        { id: 4, equation: 'x-2', input: null, output: null, nextFunction: 5 },
        { id: 5, equation: 'x/2', input: null, output: null, nextFunction: 3 },
    ]);

    const calculateOutput = (equation: string, input: number | null): number | null => {
        if (input === null) return null;
        try {
            const sanitizedEquation = equation.replace(/x/g, input.toString()).replaceAll(/\^/g, '**');
            return eval(sanitizedEquation); // Note: Use a math library for better security.
        } catch {
            return null;
        }
    };

    const updateChain = (updatedEquation: string, id: number) => {
        setFunctions(prev => {
            return prev.map(func => {
                if (func.id === id) {
                    const newOutput = calculateOutput(updatedEquation, func.input);
                    return { ...func, equation: updatedEquation, output: newOutput };
                }
                return func;
            });
        });
    };

    return { functions, updateChain, calculateOutput };
};