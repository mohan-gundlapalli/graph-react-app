import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import "bootstrap/dist/css/bootstrap.min.css";
import {PublicClientApplication} from "@azure/msal-browser";
import {MsalProvider} from "@azure/msal-react";
import {msalConfig} from "./authConfig";

import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);


const msalInstance = new PublicClientApplication(msalConfig);

root.render(<React.StrictMode>
  <MsalProvider instance={msalInstance}>
    <App />
    </MsalProvider>
</React.StrictMode>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
