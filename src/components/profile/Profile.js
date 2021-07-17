import React, { Fragment, useEffect, useState } from "react";
import ReactDOM from 'react-dom'
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import './profile.css'
import Listpictures from './Listpictures'
//components


export function Profile({ setAuth }){
  console.log('ini')
  const [image, setImages] = useState("");
  const [allImages, setAllImages] = useState([]);

  const getPictues = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/listpictures", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });
      console.log('[MEU RES]',res)
      const parseData = await res.json();
      
     
      setAllImages(parseData);
      console.log('[aqui] parse data',parseData)
      setImages(parseData); // name is the first array item
      //setImages(parseData[1].description); era assim
      
      console.log('[IMAGENS AQUI]',image)
      //const keys = Object.keys(parseData[4]);
      /*const newarray = Object.values(parseData)
      console.log(typeof(newarray))*/




      for(let description in parseData){
        var myImage = new Image(100, 200);
        myImage.src = [parseData[description]]
        document.getElementById('app').appendChild(myImage);
      }
      
      

      /*//teste abre    [IMPORTANTE]  [CONTINUAR]    _+_+_+_+_+_+__+_+_+_+_+_+_+_+_+_
      const ur = 'https://ibcdn.canaltech.com.br/MBsP06iCjq0OAjIloZvkdrJu0Sk=/filters:watermark(wm/v1.png,center,center,1,20)/i257632.jpeg'
      function renderizar(){
      for(const description in parseData){
        console.log('funfou')
        const newImage = document.getElementById('newimg');
        const img = React.createElement('img',{
          src:[ur]
        })
        return ReactDOM.render(img,newImage)
      }
    }
      console.log('all',allImages)
      renderizar()
      //teste fecha/  == - =-+_+_++_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+[IMPORTANTE]*/


      // TESTEEEEEE ABRE
      /*const links = parseData[0].description
      for (var description in parseData) {
        const YourComponent = ({description}) => {

          const myImage = React.createElement("img", {
             src: description,
             // any other image attributes you need go here
          }, null);
        
          return (
            {myImage}
          );
        }
      
      }*/
      //teste2
      /*const YourComponent = ({img}) => {

        const myImage = React.createElement("img", {
           src: img.src,
           // any other image attributes you need go here
        }, null);
      
        return (
          {myImage}
        );
      }*/
      
    // TESTE FECHA
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Successfully logged out");
    } catch (err) {
      console.error(err.message);
    }
  };
  //=============pegar fotos ===================

  //============pegar fotos =====================

  useEffect(() => {
    getPictues();
  
  }, []);
  console.log('[IMAGES 2]',image)

  return (
    <div>
      <Link to="/upload">Uploads</Link>
      
      <div className="d-flex mt-5 justify-content-around">
        <h2>'s Todo List</h2>
        <div id="app">
        </div>
        <button onClick={(e) => logout(e)} className="btn btn-primary">
          Logout
        </button>
        <div id="newimg"></div>

      </div>
    </div>

    
  );
};

export default Profile;