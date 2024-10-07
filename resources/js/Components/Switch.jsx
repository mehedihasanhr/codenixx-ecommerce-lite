const Switch = ({ children }) => {
    return children;
};

const Case = ({ condition, children }) => {
    return condition ? children : null;
};

Switch.Case = Case;

export default Switch;
