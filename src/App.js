import React,{useEffect,useContext} from 'react';
import './App.css';
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import View from './Pages/ViewPost'
import Post from './store/PostContext'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import { AuthContext, FirebaseContext } from './store/FirebaseContext';

function App() {
  const {setUser} = useContext(AuthContext)
  const {auth} = useContext(FirebaseContext)
  useEffect(()=>{
    if (auth){
    const unsubscribe = auth.onAuthStateChanged((user)=>{
      setUser(user);
  });
  return () => unsubscribe();
}
},[auth,setUser]);

  return (
    <div>
    <Post>
      <Router >
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/create' element={<Create />} />
        <Route path='/view' element={<View />} />
        </Routes>
      </Router>
    </Post>
    </div>
  );
}

export default App;
