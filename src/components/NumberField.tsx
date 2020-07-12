import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';

interface OwnProps {
    value: number;
    onChange: (value: number) => void;
    label: string;
    validateByScheme?: (value: number) => string | null;
    onValidationResultChange?: (isValid: boolean) => void;
    showErrors?: boolean;
}

const NumberField: React.FC<OwnProps> = (props) => {
    const [stateValue, setStateValue] = useState<string>(props.value.toString());
    const [isValid, setIsValid] = useState<boolean>(props.validateByScheme ? (props.validateByScheme(props.value) === null ? true : false) : true);
    const [errorText, setErrorText] = useState<string>("");
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const eventValue = event.target.value;
        setStateValue(formatNumberString(eventValue));
        props.onChange(Number(eventValue));
        const newErrorText: string = props.validateByScheme ? (props.validateByScheme(Number(eventValue)) !== null ? props.validateByScheme(Number(eventValue))! : "") : "" 
        if (props.validateByScheme && isValid && props.validateByScheme(Number(eventValue)) !== null){
            setIsValid(false);
        }else if (props.validateByScheme && !isValid && props.validateByScheme(Number(eventValue)) === null){
            setIsValid(true)
        }
        setErrorText(newErrorText)
    }
    useEffect(() => {
        if (props.onValidationResultChange){
            props.onValidationResultChange(isValid);
        }
        // eslint-disable-next-line
    }, [isValid]);
    return (
        <TextField
            variant="outlined"
            type="number"
            inputProps={{ inputMode: 'numeric' }}
            label={props.label}
            value={stateValue}
            onChange={handleChange}
            error={errorText !== "" && props.showErrors}
            helperText={props.showErrors && errorText}
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