import React, { useState,useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/FirebaseContext';
import { createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { getFirestore,collection,addDoc } from 'firebase/firestore';

export default function Signup() {
  const navigate = useNavigate() // useHistory removed from react
  const [username,setUsername]= useState('');
  const [email,setEmail]= useState('');
  const [phone,setPhone]= useState('');
  const [password,setPassword]= useState('');
  const {auth} = useContext(FirebaseContext)
  const firestore = getFirestore();

  const handleSubmit =async (e)=>{
      e.preventDefault();
      if (!auth) {
        console.error('Firebase auth not found!');
        return;
      }
      try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(result.user, { displayName: username });
        
        //Add user details to Firestore 
        await addDoc(collection(firestore, 'users'),{  
           id:result.user.uid,
            username:username,
            phone:phone
          }).then(()=>{
            navigate("/login") 
          });
       
        console.log('User signed up and profile updated');
      } catch (error) {
        console.error('Error signing up:', error.message);
      }
      /*auth.createUserWithEmailandPassword(email,password).then((result)=>{
        result.user.updateProfile({displayName:username})*/
      };
  

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a onClick={()=> navigate("/login")}>Login</a>
      </div>
    </div>
  );
}
