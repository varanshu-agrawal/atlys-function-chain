import React, { useState } from 'react';
import FunctionCard from './components/FunctionCard.tsx';
import { useFunctionChain } from './hooks/useFunctionChain.ts';
import { FunctionChain, ValueType } from './types/index';

const App = () => {
    const [value, setValue] = useState<ValueType>({
        preValue: null,
        nextValue: 2
    });
    const { functions, calculateOutput } = useFunctionChain(value.nextValue ?? 0);
    const [currentFunction, setCurrentFunction] = useState<FunctionChain>(functions[0]);
    const [functionFlow, setFunctionFlow] = useState<number[]>([functions[0].id]);
    const [isFinalPopupVisible, setIsFinalPopupVisible] = useState(false);
    const [isInputPopupVisible, setIsInputPopupVisible] = useState<boolean>();
    const [finalOutput, setFinalOutput] = useState<number | null>(null);
    const [gotResult, setGotResult] = useState(false)

    const goToNext = (argFnID: number | null) => {
        if (isFinalPopupVisible) return;
        if (gotResult) {
            setIsFinalPopupVisible(true);
            return
        }
        const res = calculateOutput(currentFunction.equation, value.nextValue);
        setValue({
            preValue: value.nextValue,
            nextValue: res ?? 0
        });

        if (typeof argFnID === 'number') {
            const nextFunction = functions.find(item => item.id === argFnID);
            if (nextFunction) {
                setFunctionFlow([...functionFlow, nextFunction.id]);
                setCurrentFunction(nextFunction);
            }
        } else {
            setIsFinalPopupVisible(true);
            setFinalOutput(res ?? 0);
            setGotResult(true)
        }
    };

    const valueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputText = Number(e.target.value)
        if (typeof inputText !== "number") return
        setGotResult(false)
        setValue((pre): any => {
            return {
                ...pre,
                nextValue: inputText
            }
        })
    }

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
                onInputClickHandler={() => setIsInputPopupVisible(true)}
            />

            {isFinalPopupVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-[2rem] font-semibold mb-4">Final Output</h2>
                        <p className="text-xl mb-4">{finalOutput}</p>
                        <button
                            onClick={() => setIsFinalPopupVisible(false)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            {isInputPopupVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center flex flex-col gap-4">
                        <h2 className="text-[2rem] font-semibold">Current Input</h2>
                        <input type='number'
                            className='mb-4 p-3 border border-black rounded-md outline-none'
                            defaultValue={gotResult ? value.preValue : value.nextValue}
                            onChange={valueChangeHandler}
                        />
                        <button
                            onClick={() => setIsInputPopupVisible(false)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;