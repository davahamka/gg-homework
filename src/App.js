import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [token, setToken] = useState("");
  const [dataUser, setDataUser] = useState(null);
  const [status, setStatus] = useState("idle") 

  useEffect(()=>{
    setStatus("pending")
    fetch('https://accounts.spotify.com/api/token', {
      method:'POST',
      headers:{
        'Authorization': 'Basic ' +  btoa(process.env.REACT_APP_SPOTIFY_CLIENT_ID + ':' + process.env.REACT_APP_SPOTIFY_CLIENT_SECRET),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({grant_type: 'client_credentials'})
    }).then(res=>res.json())
      .then(data=>setToken(data.access_token))
  },[])

  useEffect(()=>{
    if(token) {
      fetch("https://api.spotify.com/v1/me", {
      method:'GET',
      headers:{
        "Authorization": `Bearer BQBrctexL2bEbzb-qwWcHw08jUObSGc7T5PggxhL6pp2dIA73DEwWri6-DUCkhTURex314MHdtCbdfHmhxL7k-qbq9Qib-P_VwVSFhxUmOVlqVPoTcFgXsuvsDJhUHHpavnwQaQ7aHqhjyayvk6ZeWuGCg`
      }
    }).then((res)=>res.json())
      .then((data)=>{setDataUser(data);setStatus("success")})
      .catch(err=>{
        console.log(err)
      }
    )
    }
  },[token])

  return (
    <div className="App">
      <header className="App-header">
       {status==="success" ?<img src={dataUser.images[0].url} className="App-logo" alt="logo" /> :status === "pending" || status === "idle" ? <img src={logo} className="App-logo" alt="logo" /> : ""}
        <p>
          <p className='text-display'>{dataUser?.display_name ?? "display_name"} - {dataUser?.country ?? "country"}</p>
        </p>
        <p>{process.env.REACT_APP_SPOTIFY_CLIENT_SECRET}</p>
      </header>
    </div>
  );
}

export default App;
