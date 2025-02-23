import React,{useEffect, useState, useContext} from 'react';

import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/FirebaseContext';
import { collection, query, where, getDocs} from 'firebase/firestore';

function View() {
  const [userDetails,setUserDetails] = useState()
  const {postDetails} = useContext(PostContext)
  const {firestore} = useContext(FirebaseContext)
  
  useEffect(()=>{
      
    const fetchUserDetails = async () => {
      if(postDetails && postDetails.userId){
          const {userId} = postDetails;

          const usersCollectionRef = collection(firestore,'users');
          const q = query(usersCollectionRef, where('id','==',userId));

          try{
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
            setUserDetails(doc.data());
          });
          }catch (error) {
            console.error('Error fetching user details:', error);
          }
      }
    };

    fetchUserDetails();
  },[postDetails, firestore]);

  if(!postDetails){
    return <div>Loading...</div>;
  }
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt="PostDetails not Appeared"
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
