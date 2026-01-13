import React from 'react';
import ReactDOM from 'react-dom/client';
import AppPopup from './App.popup';
import './popup.css';

// Mount popup app
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <AppPopup />
    </React.StrictMode>,
);
