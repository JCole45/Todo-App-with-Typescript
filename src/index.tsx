import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {onPatch} from 'mobx-state-tree';

import Invoice from './models/todos'


const invoice:any = Invoice.create({currency: 'CAD', is_paid: false});

onPatch(invoice, patch=> {
    console.log(patch)
})

ReactDOM.render(<App invoice={invoice} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
