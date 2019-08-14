import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './router'
// import './mock'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import Intl from './components/Intl'

ReactDOM.render(
  <Intl>
    <App />
  </Intl>,
  document.getElementById('root')
);
registerServiceWorker();
