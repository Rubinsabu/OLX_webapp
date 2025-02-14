import React,{createContext,useState} from 'react';
import {firestore,auth, storage} from '../../src/firebase/config';

export const FirebaseContext = createContext(null)

export const AuthContext = createContext(null)

export default function Context ({children}) {
    const [user,setUser] =useState(null)

    return(
        <AuthContext.Provider value={{user,setUser}}>
            <FirebaseContext.Provider value={{firestore, auth, storage}}>
                {children}
            </FirebaseContext.Provider> 
        </AuthContext.Provider>
    );

}
      
