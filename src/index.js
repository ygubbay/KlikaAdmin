import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/app';
import { Provider } from "react-redux";
import store from "./store";
import "./web.config";

require('./styles/ts-styles.less');
require('../node_modules/rc-pager/assets/bootstrap.css')
require('./images/favicon.ico');

ReactDOM.render(
<Provider store={store}><App />
</Provider>, document.getElementById('app'));