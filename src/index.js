import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Context, {FirebaseContext} from './store/FirebaseContext';
import {app, auth, firestore} from './firebase/config';

const firebase = {app, auth, firestore};

ReactDOM.render(
<FirebaseContext.Provider value={firebase}>
<Context>
<App />
</Context>
</FirebaseContext.Provider>
, document.getElementById('root'));
