import React, { Fragment,useContext,useState } from 'react';
import './Create.css';
import {useNavigate} from 'react-router-dom'
import Header from '../Header/Header';
import {FirebaseContext,AuthContext} from '../../store/FirebaseContext';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

const Create = () => {
  const navigate = useNavigate()
  const {storage, firestore} = useContext(FirebaseContext);
  const {firebase} = useContext(FirebaseContext);
  const {user} = useContext(AuthContext);
  const [name,setName] = useState('');
  const [category,setCategory] = useState('');
  const [price,setPrice] = useState('');
  const [image,setImage] = useState(null);
  const date = new Date();

  const handleSubmit = async()=>{
    if (!storage) {
      console.error("Firebase is not availabe");
      return;
    }

    if (!image) {
      console.error("No image selected");
      return;
    }

    try {
      const imageRef = ref(storage, `/image/${image.name}`);
      await uploadBytes(imageRef, image);
      const url = await getDownloadURL(imageRef);
      console.log(url);
      await addDoc(collection(firestore,'products'),{
        name:name,
        category:category,
        price:price,
        url:url,
        userId:user.uid,
        createdAt:date.toDateString()
      });
      navigate("/")
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              id="fname"
              onChange={(e) => setName(e.target.value)}
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              id="fname"
              onChange={(e) => setCategory(e.target.value)}
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" 
              type="number" 
              value={price}
              id="fname"
              onChange={(e) => setPrice(e.target.value)}
              name="Price" />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" 
                height="200px" 
                src={image ? URL.createObjectURL(image) : ''}></img>
          
            <br />
            <input type="file" 
              onChange={(e) => setImage(e.target.files[0])}
            />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
