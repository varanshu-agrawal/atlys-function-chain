export interface FunctionCardProps {
    id: number;
    equation: string;
    nextFunction: number | null;
    input: number | null;
    onUpdateEquation: any;
    functions: FunctionChain[];
    functionFlow: number[]
}

export interface FunctionChain {
    id: number;
    equation: string;
    input: number | null;
    output: number | null;
    nextFunction?: number | null;
}