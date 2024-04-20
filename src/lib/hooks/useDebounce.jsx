// Resource : https://www.30secondsofcode.org/react/hooks/p/1/
import React from "react";

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = React.useState(value);

    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

export default useDebounce;

// Use of this hook
//
//          () => {
//             const [value, setValue] = React.useState(0);
//             const lastValue = useDebounce(value, 500);
//             return()
//          }
