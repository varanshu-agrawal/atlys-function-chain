import React, { FC } from 'react';

interface FinalOutputProps {
    finalOutput: number | null;
}

const FinalOutput: FC<FinalOutputProps> = ({ finalOutput }) => {
    return (
        <div className="final-output">
            <div className="output-label">Final Output (y):</div>
            <div className="output-value">{finalOutput !== null ? finalOutput : 'N/A'}</div>
        </div>
    );
};

export default FinalOutput;