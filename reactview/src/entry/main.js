import React from 'react';
import ReactDOM from 'react-dom';
import '../assets/font/style.css';
import '../assets/styles/public.css';
// import AntdModile from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
// import '../assets/styles/theme.less';
import '../index.css';
import App from '../App';
import registerServiceWorker from '../registerServiceWorker';

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
