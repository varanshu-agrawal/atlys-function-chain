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
            let sanitizedEquation = equation.replace(/x/g, `(${input})`).replaceAll(/\^/g, '**');
            sanitizedEquation = sanitizedEquation.replace(/(\d)\(/g, '$1*('); // Add * before (
            sanitizedEquation = sanitizedEquation.replace(/\)(\d)/g, ')*$1'); // Add * after )
            console.log("sanitizedEquation", sanitizedEquation);

            return eval(sanitizedEquation); // Note: Use a math library for better security.
        } catch {
            return null;
        }
    };

    return { functions, calculateOutput };
};