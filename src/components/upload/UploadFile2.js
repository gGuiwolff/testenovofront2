import { toast } from "react-toastify";
import axios from 'axios';
import React, { useEffect,Component, Fragment, useState } from 'react';
import './App.css'
const Dashboard = ({ setAuth }) => {
	const [name, setName] = useState("");
	const [allTodos, setAllTodos] = useState([]);
	const [todosChange, setTodosChange] = useState(false);
  
	const getProfile = async () => {
	  try {
		const res = await fetch("http://localhost:5000/dashboard/images", {
		  method: "GET",
		  headers: { jwt_token: localStorage.token },
		});
  
		const parseData = await res.json();
  
		setAllTodos(parseData);
  
		setName(parseData[0].user_name); // name is the first array item
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
  
	useEffect(() => {
	  getProfile();
	  setTodosChange(false);
	}, [todosChange]);
}
//          A CIMA ESTA A AUTENTICAÇAO

export class UploadFile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedFiles: null,
			progress: '',
			urls: [],
			uploaded: false,
		};
		/*const [inputs, setInputs] = useState({
			email: "",
		  });
		  */
		//const { email, password, name } = inputs;

	}
	

	fileHandler = (event) => {
		console.log(event.target.files);
		this.setState({ selectedFiles: event.target.files });
	};
	fileUpload = () => {
		let files = [];
		for (let i = 0; i < this.state.selectedFiles.length; i++) {
			let formData = new FormData();
			formData.append('file', this.state.selectedFiles[i]);
			formData.append('upload_preset', 'fsibtowr');//upload_preset_unsigned is available under upload tab. create it if it's not available.
			//cloudinary_username will be available under top right corner.
axios
				.post('https://api.cloudinary.com/v1_1/guiwolff/image/upload', formData, {
					onUploadProgress: (progressEvent) => {
						this.setState({ progress: Math.round(progressEvent.loaded / progressEvent.total * 100) + '%' });
					}
				})
				
				.then((response) => {
					files.push(response.data.url);
					let urls = [ ...this.state.urls ];
					urls.push(response.data.url);
					this.setState({ urls });
					if (files.length === this.state.selectedFiles.length) {
						this.setState({ uploaded: true });
						this.fileInput.value = '';
						setTimeout(() => {
							this.setState({ uploaded: false, progress: '' });
						}, 3000);
						if(urls[0]){ 
		                        onSubmitForm()
								
							}
						/*const myHeaders = new Headers();
					  
							myHeaders.append("Content-Type", "application/json");
							myHeaders.append("jwt_token", localStorage.token);
						async function enviar(body){
							try{
						const response2 = await fetch("http://localhost:5000/salvarupload/upload", {
							  method: "POST",
							  headers: myHeaders,
							  body: JSON.stringify(this.urls[0])
							});
						}catch(error){
							console.log(error)
						}
						}*/
					}
					//console.log(`mostrando ${urls[0]}`)
					
					//   TESTE   DF
					
						//   TESTE     DF
				});

				/*async function pegarLink() {
				   try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      const body = { description };
      const response = await fetch("http://localhost:5000/salvarupload/upload", {
        body: JSON.stringify(body, () => {console.log(body)})
      });

      const parseResponse = await response.json();

      console.log(parseResponse);

      setTodosChange(true);
      setDescription("");
      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
}*/			
				
				/*try {
					

					const response = await fetch(
					  "http://localhost:5000/uploadimage/register",
					  {
						method: "POST",
						headers: {
						  "Content-type": "application/json"
						},
						body: JSON.stringify(body)
					  }
					);
					const parseRes = await response.json();
			  
					if (parseRes.jwtToken) {
					  localStorage.setItem("token", parseRes.jwtToken);
					  setAuth(true);
					  toast.success("Registered Successfully");
					} else {
					  setAuth(false);
					  toast.error('parseRes error: ', parseRes);
					}
				  } catch (err) {
					console.error('onSubmit form error: ', err.message);
				  }
				*/
		}
		const onSubmitForm = async () => {
			try {
			  const myHeaders = new Headers();
		
			  myHeaders.append("Content-Type", "application/json");
			  myHeaders.append("jwt_token", localStorage.token);
		      const description = this.url[0]
			  console.log('minha description',description)
			  const body = { description };
			  console.log('a descricao do body e', body)
			  const response = await fetch("http://localhost:5000/dashboard/images", {
				method: "POST",
				headers: myHeaders,
				body: JSON.stringify(body)
			  });
			  // window.location = "/";
			} catch (err) {
			  console.error(err.message);
			}
		  };
	};
	render() {
		return (
			<Fragment>
			<div className="projetar">
				<h1>{this.name}</h1>
				<form className='fileupload' onSubmit={this.onSubmitForm}>
					<input
						type='file'
						ref={(ref) => (this.fileInput = ref)}
						multiple
						className='inputfile'
						onChange={this.fileHandler}
					/>
					<input
						type='button'
						onClick={this.fileUpload}
						className='submit'
						value={this.state.progress ? 'Uploading..' + this.state.progress : 'Upload'}
						onChange={e => this.setDescription(this.urls[0])}
					/>
				</form>
				{this.state.uploaded && <h1 style={{ textAlign: 'center', color: 'white' }}>Uploaded Successfully</h1>}
				<div style={{ textAlign: 'center' }}>
					{this.state.urls.length > 0 &&
						this.state.urls.map((url) => <img src={url} key={url} alt='Cloudinary pic' />)}
				</div>
			</div>
			</Fragment>
		);
	}
}

export default UploadFile;
