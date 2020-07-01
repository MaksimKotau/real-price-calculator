import React, { useState } from 'react';
import { TextField } from '@material-ui/core';

interface OwnProps {
    value: number;
    onChange: (value: number) => void;
    label: string
}

const NumberField: React.FC<OwnProps> = (props) => {
    const [stateValue, setStateValue] = useState<string>(props.value.toString())
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const eventValue = event.target.value;
        setStateValue(formatNumberString(eventValue));
        props.onChange(Number(eventValue))
    }
    return (
        <TextField
            variant="outlined"
            type="number"
            inputProps={{ inputMode: 'numeric' }}
            label={props.label}
            value={stateValue}
            onChange={handleChange}
        />
    )
}

export default NumberField;

export const formatNumberString = (value: string): string => {
    const [firstPartOfNumber, secondPartOfNumber] = value.split(getDecimalSeparator());
    const hasDecimalSeparator = typeof secondPartOfNumber === 'string';
    let firstPartWithoutZeros = firstPartOfNumber.replace(/^0+/, '');
    if (firstPartWithoutZeros.length === 0){
        firstPartWithoutZeros = "0"
    } 
    let result = `${firstPartWithoutZeros}${hasDecimalSeparator ? getDecimalSeparator() : ""}${secondPartOfNumber ? secondPartOfNumber : ""}` 
    return result;
}

const getDecimalSeparator = (): string => {
    let n = 1.1;
    let result = n.toLocaleString().substring(1, 2);
    return result;
}