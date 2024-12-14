import React, { FC, useEffect, useState } from 'react';
import { FunctionCardProps } from '../types';
import { useFunctionChain } from '../hooks/useFunctionChain';

const FunctionCard = ({
    id,
    equation,
    nextFunction,
    input,
    onUpdateEquation,
    functions,
    functionFlow
}: FunctionCardProps) => {
    const [selectedFunction, setSelectedFunction] = useState<number | null>(null);

    useEffect(() => {
        if (nextFunction && !functionFlow.includes(nextFunction)) {
            setSelectedFunction(nextFunction);
        } else {
            const firstValue = functions.filter(item => !functionFlow.includes(item.id))
            if (firstValue)
                setSelectedFunction(firstValue[0].id)
        }
    }, [nextFunction, functionFlow]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onUpdateEquation(id, e.target.value);
    };

    const handleFunctionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFunction(Number(e.target.value));
    };

    return (
        <>
            <div className="card-header text-[#a5a4a5] flex gap-2 items-center text-[1.5rem]"><span>&#65825;</span><span>Function: {id}</span></div>
            <div className='flex flex-col mb-3'>
                <p className='pb-1'>Equation</p>
                <input
                    type="text"
                    value={equation}
                    onChange={handleInputChange}
                    className="equation-input p-2 border-2 border-[#d3d3d3] rounded-md"
                />
            </div>
            <div className="flex flex-col mb-3">
                <p className="pb-1">Function</p>
                <select
                    className="p-2 border-2 border-[#d3d3d3] rounded-md disabled:text-[#c7c6c7] disabled:bg-[#f4f5f5] disabled:border-[#c7c6c7]"
                    value={selectedFunction || ""}
                    // disabled
                    onChange={handleFunctionChange}
                >
                    {
                        functionFlow.length === functions.length
                            ? <option value="" disabled>
                                -
                            </option>
                            : null
                    }
                    {functions?.map((value) =>
                        !functionFlow.includes(value.id) ? (
                            <option key={value.id} value={value.id}>
                                Function: {value.id}
                            </option>
                        ) : null
                    )}
                </select>
            </div>
            <div className='flex justify-between mt-auto'>
                <button type="button" onClick={() => { }} className='p-2 border border-black rounded-md'>Input</button>
                <button type="button" onClick={() => onUpdateEquation(selectedFunction)} className='p-2 border border-black rounded-md'>Output</button>
            </div>
        </>
    );
};

export default FunctionCard;