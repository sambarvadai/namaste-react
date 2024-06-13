/* Starting of React code
    const henlo = React.createElement("h1",{
        id:"root-heading"
    },"Hello World using React");
*/ /* Experimenting with a nested structure */ const henlo = React.createElement("div", {
    id: "root-div"
}, React.createElement("div", {
    id: "child-div"
}, [
    React.createElement("h1", {
        id: "h1-tag"
    }, "Hello from Nested structure"),
    React.createElement("h1", {
        id: "h12-tag"
    }, "Hello from Nested-Same level")
]));
const rootElement = ReactDOM.createRoot(document.getElementById("root"));
rootElement.render(henlo);

//# sourceMappingURL=index.6bd02f5a.js.map
