import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AxiosClient from "./AxiosClient";
import CustomTheme from "./CustomTheme";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CustomTheme>
        <AxiosClient/>
      </CustomTheme>
    </BrowserRouter>
  </React.StrictMode>
);

