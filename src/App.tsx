import React, { useState } from 'react';
import FunctionCard from './components/FunctionCard.tsx';
import FinalOutput from './components/FinalOutput.tsx';
import { useFunctionChain } from './hooks/useFunctionChain.ts';
import { FunctionChain } from './types/index';

const App = () => {
    const [initialValue, setInitialValue] = useState(2);
    const { functions, calculateOutput } = useFunctionChain(initialValue);
    const [currentFunction, setCurrentFunction] = useState<FunctionChain>(functions[0])
    const [functionFlow, setFunctionFlow] = useState<number[]>([functions[0].id])

    const handleInitialValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInitialValue(parseFloat(e.target.value));
    };

    const goToNext = (value: number | null) => {
        const res = calculateOutput(currentFunction.equation, initialValue)
        setInitialValue(res ?? 0)
        if (typeof value === "number") {
            const nextFunction = functions.find(item => item.id === value)
            console.log(res);
            if (nextFunction) {
                setFunctionFlow([...functionFlow, nextFunction.id])
                setCurrentFunction(nextFunction)
            }
        }
    }

    console.log(functionFlow);


    return (
        <div className="app absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[300px] min-h-[300px] bg-white rounded-md p-3 flex flex-col">
            <FunctionCard
                key={currentFunction.id}
                id={currentFunction.id}
                equation={currentFunction.equation}
                nextFunction={(currentFunction.nextFunction as any)}
                input={currentFunction.input}
                functions={functions}
                functionFlow={functionFlow}
                onUpdateEquation={goToNext}
            />
            {/* <FinalOutput finalOutput={finalOutput} /> */}
        </div>
    );
};

export default App;