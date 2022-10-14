import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import './Application.css';
import App from  "./App"



let google = window.google
function Appfirst() {
   const [ user, setUser] = useState({});

   function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token" + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
   }

   function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
    document.getElementById("heading").hidden = false;
   }
    

   
   useEffect(() => {

     google.accounts.id.initialize({
      client_id: "134075483502-nqnpac6a91v93nnhnbq4g936ti1j5bu1.apps.googleusercontent.com",
      callback: handleCallbackResponse
   });

   google.accounts.id.renderButton(
    document.getElementById("signInDiv"),
    { theme: "outline", size: "large"}
   )

   }, []);

  return (
    <div className="Appfirst">
       <h2 id='heading'>Google Login Form</h2>
       <div id='signInDiv'></div>
       
       { user && <div>
        <h3>{user.name}</h3>     
        <h3>{user.email}</h3> 

       { Object.keys(user).length != 0 && <button  id='btn' onClick={ (e) => handleSignOut(e)}><div id="signOut" >Sign Out</div><div><App/></div></button>}

       </div>}
    </div>
  );
}

export default Appfirst;
