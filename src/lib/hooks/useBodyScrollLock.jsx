// Resource : https://www.30secondsofcode.org/react/hooks/p/1/
import React from "react";

const useBodyScrollLock = () => {
    React.useLayoutEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = "hidden";
        return () => (document.body.style.overflow = originalStyle);
    }, []);
};

export default useBodyScrollLock;

// Use of this hook
//
//          () => {
//             useBodyScrollLock();
//             return()
//          }
