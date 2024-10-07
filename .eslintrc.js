module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    parserOptions: {
        ecmaVersion: 2021, // Use the latest ECMAScript version
        sourceType: "module", // Allow the use of imports
        ecmaFeatures: {
            jsx: true, // Enable JSX parsing
        },
    },
    extends: ["airbnb"], // Use Airbnb's ESLint config
    plugins: ["react"], // Enable React plugin
    rules: {
        // Example customizations:
        "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }], // Allow JSX in .js files
        "react/react-in-jsx-scope": "off", // React is in scope in Next.js, so disable this rule
        "import/extensions": "off", // Allow omitting file extensions when importing
    },
};
