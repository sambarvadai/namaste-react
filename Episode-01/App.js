
    /* Starting of React code*/
    const henlo = React.createElement("h1",{
        id:"root-heading"
    },"Hello World using React");

    const rootElement = ReactDOM.createRoot(document.getElementById("root"));
    rootElement.render(henlo);
