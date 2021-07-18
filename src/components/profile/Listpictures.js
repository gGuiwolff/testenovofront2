import React, { Fragment, useState, useEffect } from "react";
import ReactDOM from 'react-dom'
import UploadFile from '../upload/UploadFile'

const Listpictures = ({ allImages }) => {
  console.log('IMAGES LIST',allImages);
  const [images, setTodos] = useState([]); //useState to set todos to

  useEffect(() => {
    setTodos(allImages);
  }, [allImages]);
  console.log(allImages);

  return (<Fragment>
    {" "}
    <table className="table mt-5">
      <thead>
        <tr>
          <th>Description</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {images.length !== 0 &&
          images[0].image_id !== null &&
          images.map(todo => (
            <tr key={todo.image_id}>
              <td>{todo.description}</td>
              <td>
              </td>
              <td>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
    <div id="newimg"></div>
  </Fragment>
  );
};

export default Listpictures;
