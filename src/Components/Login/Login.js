import React,{useState,useContext} from 'react';
import {FirebaseContext} from '../../store/FirebaseContext'
import Logo from '../../olx-logo.png';
import './Login.css';
import {useNavigate} from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const [email,setEmail]= useState('')
  const [password,setPassword] = useState('')
  const {auth} = useContext(FirebaseContext)
  const navigate = useNavigate()

  const handleLogin = (e)=>{
    e.preventDefault(); //to avoid refresh
    try {
      signInWithEmailAndPassword(auth, email, password)
      .then(()=>{
        navigate('/')
      }).catch((error)=>{
        alert(error.message);
      })

    }catch(error) {
      console.error('Error logging in:', error.message);
  }
};
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            onChange={(e)=>setEmail(e.target.value)}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            onChange={(e)=>setPassword(e.target.value)}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a href='/signup'>Signup</a>
      </div>
    </div>
  );
}

export default Login;
