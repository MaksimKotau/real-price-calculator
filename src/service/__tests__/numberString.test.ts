import {formatNumberString} from '../../components/NumberField';

describe('test NumberStringFormatter', () => {
    it('should delete start zeros', () => {
        const value1 = "00";
        const value2 = "05";
        const value3 = "05.0";
        const value4 = "00.";
        const value5 = "0.";
        const value6 = "0.250";
        expect(formatNumberString(value1)).toEqual("0");
        expect(formatNumberString(value2)).toEqual("5");
        expect(formatNumberString(value3)).toEqual("5.0");
        expect(formatNumberString(value4)).toEqual("0.");
        expect(formatNumberString(value5)).toEqual("0.");
        expect(formatNumberString(value6)).toEqual("0.250");
    })
    it('should not delete end zeros', () => {
        const value1 = "0.000";
        const value2 = "0.0100";
        const value3 = "1.00"
        const value4 = ".";
        expect(formatNumberString(value1)).toEqual("0.000");
        expect(formatNumberString(value2)).toEqual("0.0100");
        expect(formatNumberString(value3)).toEqual("1.00");
        expect(formatNumberString(value4)).toEqual("0.");
    })
})