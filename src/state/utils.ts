import { ApplicationState } from "./state";

export const withLocalStorageCache = (reducer: any) => {
    return (state: any, action: any) => {
        const newState = reducer(state, action);
        localStorage.setItem("app-data", JSON.stringify(newState));
        return newState;
    }
};

export const getInitialState = (): ApplicationState => {
    if (localStorage.getItem("app-data") !== null) {
        try {
            return JSON.parse(localStorage.getItem("app-data") as string) as unknown as ApplicationState;
        } catch (err) {
            return {
                calculation: {
                    count: [],
                    volume: [],
                    weight: []
                },
                history: []
            };
        }
    } else {
        return {
            calculation: {
                count: [],
                volume: [],
                weight: []
            },
            history: []
        };
    }

};