import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import App from './App';

import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    {/* ant design config */}
    <ConfigProvider
      theme={{
        token: {
          fontFamily: '"Rubik", sans-serif',
        },
        components: {
          Button: {
            colorPrimaryActive: '#4f46e5', 
            colorPrimaryHover: '#4f46e5',
          }
        }
      }}
    >
      <App />
    </ConfigProvider>
  </BrowserRouter>
);