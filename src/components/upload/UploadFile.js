import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Axios from 'axios'

//components

function UploadFile({setTodosChange}) {
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const uploadImage = async e => {
    console.log('File uploading');
    const { files } = e.target;

    console.log(e.target.files);

    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'fsibtowr');
    setLoading(true);

    console.log(data);

    for (let d of data.entries()) {
      console.log(d[0] + ', ' + d[1]);
    }
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/guiwolff/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );
    if(res){
      const description = await res.json([{
        user_id:{}
      }]);
      try {
        const myHeaders = new Headers();
  
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("jwt_token", localStorage.token);
  
        const body = { description };
        console.log('meu body.description.url esta aqui...',body.description.url)
        const response = await fetch("http://localhost:5000/dashboard/images", {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(body)
        });
        
        const parseResponse = await response.json();
        // window.location = "/";
      } catch (err) {
        console.error(err.message);
      }
    console.log(description.url)
    setImage(description.secure_url);
    setLoading(false);
    console.log('a url é:',description.url)
    
    }
};
  
  return (
    <div className='App'>
      <h1>Upload your image</h1>
      <form >
        <input type='file' name='file' onChange={uploadImage} />
        <button>Add</button>
      </form>
      <div className='preview'>
        {loading ? <p>Loading...</p> : <img src={image} alt='pic' />}
      </div>
      <div id="app"></div>
    </div>
  );
}

export default UploadFile;
