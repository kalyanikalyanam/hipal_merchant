// import React from 'react';
// // import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// // ReactDOM.render(
// //   <React.StrictMode>
// //     <App />
// //   </React.StrictMode>,
// //   document.getElementById('root')
// // );

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();


// import React from "react";
// import ReactDOM from "react-dom";
// import ReactiveQR from "./lib";

// const App = () => (
//   <div style={{ width: 300, border: "1px solid #f7f7f7" }}>
//     <ReactiveQR onInit={console.log} onCode={console.log} />
//   </div>
// );
import React, { useState } from "react";
import ReactDOM from "react-dom";
import QRScanner from "qr-code-scanner";

// import "./styles.css";

function Scanner() {
  const [code, setCode] = useState("");

  QRScanner.initiate({
    onResult: result => {
      setCode(decodeURI(result));
    },
    timeout: 20000
  });

  return (
    <div className="App">
      <h1>Scan QR Code</h1>
      {code ? (
        <>
          <p>
            The QR code reads: <strong>{code}</strong>
          </p>
          <p>
            Your code is:{" "}
            <strong style={{ textDecoration: "underline" }}>
              {code.split("/").pop()}
            </strong>
          </p>
        </>
      ) : (
        <p>Scan a QR code to view results</p>
      )}
    </div>
  );
}

export default Scanner;