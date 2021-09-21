import React,{useState} from "react";
import Axios from 'axios';
import './App.css';

function App() {

const [firstnameReg,setfirstnameReg] = useState('')
const [lastnameReg,setlastnameReg] = useState('')

const [usernameReg,setusernameReg] = useState('')
const [passwordReg,setPasswordReg] = useState('')

const [username,setusername] = useState('')
const [password,setPassword] = useState('')

const [LoginStatus, setLoginStatus] = useState('');

const register = ()=>{
  Axios.post('http://localhost:5003/register', {
    firstname :firstnameReg,
    lastname :lastnameReg,
    username: usernameReg,
    password :passwordReg
  }).then((response)=>{
    console.log(response);
  });

};

const login = ()=>{
  Axios.post('http://localhost:5003/login', {
    username: username,
    password :password,
  }).then((response)=>{

    if(response.data.message){
      setLoginStatus(response.data.message)
     
    }else{
      setLoginStatus(response.data[0].username)   
    }
    console.log(response.data);
    if(response.data){
       window.location.href="http://localhost:3000/";
    }
    
    
  });
};

  return (
    <div className="App">
      <div className ="registration">
        <h1>Registration</h1>

        <label>FirstName : </label>
        <input type="text"
        onChange={(e)=> {
          setfirstnameReg(e.target.value);
        }}
        /><br/>

        <label>LastName : </label>
        <input type="text"
        onChange={(e)=> {
          setlastnameReg(e.target.value);
        }}
        /><br/>


        <label>Username : </label>
        <input type="text"
          onChange={(e)=> {
            setusernameReg(e.target.value);
          }}
        /><br/>
        <label>Password : </label>
        <input type="text"
        onChange={(e)=> {
          setPasswordReg(e.target.value);
        }}
        /><br/>
        <button onClick={register}>Register</button>
      </div>

      <div className ="login">
        <h1>Login</h1>

        <label>Username : </label>
        <input type="text" placeholder="Username..."
         onChange={(e)=> {
          setusername(e.target.value);
        }}
        /><br/>

        <label>Password : </label>
        <input type="text" placeholder="Password..."
         onChange={(e)=> {
          setPassword(e.target.value);
        }}
        /><br/>

        <button onClick={login }>Login</button>
      </div>  

      <h1>{LoginStatus}</h1>
    </div>
  );
}

export default App;
