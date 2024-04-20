// Resource : https://www.30secondsofcode.org/react/hooks/p/1/
import React from "react";

const useWindowSize = () => {
    const [windowSize, setWindowSize] = React.useState({
        width: undefined,
        height: undefined,
    });

    React.useEffect(() => {
        const handleResize = () =>
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return windowSize;
};

export default useWindowSize;

// Use of this hook
//
//          () => {
//             const { width, height } = useWindowSize();
//             return()
//          }
