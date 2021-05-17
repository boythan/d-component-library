import React from "react";
import "./App.css";
import { InputText } from "d-component-library";

function App() {
    return (
        <div>
            <div className="container-fluid">
                <InputText label="Username" />
                <InputText label="Password" />
            </div>
        </div>
    );
}

export default App;
