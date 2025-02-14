import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Context, {FirebaseContext} from './store/FirebaseContext';
import {app, auth, firestore} from './firebase/config';

const firebase = {app, auth, firestore};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<FirebaseContext.Provider value={firebase}>
<Context>
<App />
</Context>
</FirebaseContext.Provider>
);

