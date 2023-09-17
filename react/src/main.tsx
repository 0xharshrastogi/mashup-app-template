import './styles/global.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App.tsx';

const container = document.getElementById('root');

if (!container) throw new Error('root element not found');

ReactDOM.createRoot(container).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
