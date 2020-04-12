/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Redirect, withRouter } from "react-router-dom";

import Amplify, { Auth } from "aws-amplify";
import config from "./config.js";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

import ProtectedRoute from "components/ProtectedRoute";
import LoginRoute from "components/LoginRoute";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
    /*cookieStorage: {
      domain: "http://127.0.0.1",
      path: "/",
      expires: 30,
      secure: false
    }*/
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      {
        name: "pathMaker",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
    ]
  }
});


function App (props){

  const [userNome,setUserNome] = useState("");
  const [userCognome,setUserCognome] = useState("");
  const [userEmail,setUserEmail] = useState("");
  const [check, setCheck] = useState(false);

  const [isAuthenticating, setIsAuthenticating] = useState(true);

  const [userAnnoCoca, setUserAnnoCoca] = useState("");
  const [userFormazione, setUserFormazione] = useState("");
  const [userCodiceCensimento, setUserCodiceCensimento] = useState("");
  const [userBranca, setUserBranca] = useState("");
  const [userDescrizione, setUserDescrizione] = useState("");

  /*const checkUser = () => {
    console.log("checkUser function");
    Auth.currentAuthenticatedUser()
        .then(data => {
          if(data){
            console.log("PROMISE DATA: ", data);
            console.log(data.attributes.email, data.attributes["custom:nome"] ,data.attributes['custom:cognome']);
            setUserNome(data.attributes["custom:nome"]);
            setUserCognome(data.attributes['custom:cognome']);
            setUserEmail(data.attributes['custom:cognome']);
            setCheck(true);
            console.log("SETCHECK INSIDE ASYNC CURRENT SESSION", check)
          } else {
            console.log("NO USER RESPONSE")
          }
        })
        .catch(err => console.log(err));
  }*/

  async function checkUser() {
    console.log("checkUser function");

    try{
      const data = await Auth.currentAuthenticatedUser({
        bypassCache: true
      });
      console.log("PROMISE DATA ", data);
      if(data){
        console.log(data.attributes.email, data.attributes["custom:nome"] ,data.attributes['custom:cognome']);
        setUserNome(data.attributes["custom:nome"]);
        setUserCognome(data.attributes['custom:cognome']);
        setUserEmail(data.attributes.email);
        setUserAnnoCoca(data.attributes['custom:anno-coca']);
        setUserFormazione(data.attributes['custom:formazione']);
        setUserCodiceCensimento(data.attributes['custom:codice-censimento']);
        setUserBranca(data.attributes['custom:branca']);
        setUserDescrizione(data.attributes['custom:descrizione']);
        setCheck(true);
        console.log("SETCHECK INSIDE ASYNC CURRENT SESSION", check)
      } else {
        console.log("NO USER RESPONSE")
      }      
    } catch(err) {
      console.log("CATCHING ERROR CHECKUSER ",err)
    }
    setIsAuthenticating(false);
  }

  useEffect(()=>{
    console.log("Chiamata da useEffect")
    if(!check){
      checkUser();
    } else {
      console.log("USER PREVIOUSLY AUTHENTICATED")
    }
  },[])

  const handleLoginApp = (historyBack,email,nome,cognome,others) => {
    console.log("HandleLoginApp");
    console.log("DATA FROM LOGIN PAGE",email,cognome,nome);
    setCheck(true);
    setIsAuthenticating(false);
    setUserNome(nome);
    setUserCognome(cognome);
    setUserEmail(email);
    setUserAnnoCoca(others['custom:anno-coca']);
    setUserFormazione(others['custom:formazione']);
    setUserCodiceCensimento(others['custom:codice-censimento']);
    setUserBranca(others['custom:branca']);
    setUserDescrizione(others['custom:descrizione']);
    historyBack.go("/admin")
  }

  const handleLogout = (prop,e) => {
    console.log("HANDLE LOGOUT");
    e.preventDefault();
    console.log(prop);
    Auth.signOut()
        .then(data => {
          console.log(data)
          setCheck(false);
          setIsAuthenticating(true);
          setUserNome("");
          setUserCognome("");
          setUserEmail("");
          setUserAnnoCoca("");
          setUserFormazione("");
          setUserCodiceCensimento("");
          setUserBranca("");
          setUserDescrizione("");
          console.log("LOGOUT OK, GO AWAY BYE")
          prop.history.go("/auth/login")
        })
        .catch(err => console.log("ERROR CATCHING LOGOUT ", err))
  }

  return(
    !isAuthenticating && 
    <BrowserRouter>
    <Switch>
      {/*<Route path="/admin" render={props => <AdminLayout {...props} /> } />
      <Route path="/auth" render={props => <AuthLayout {...props} /> } />*/}
      <ProtectedRoute path="/admin" check={check} 
                                    handleLogout={handleLogout} 
                                    user = {{
                                      nome: userNome.toString(),
                                      cognome: userCognome.toString(),
                                      email: userEmail.toString(),
                                      annoCoca: userAnnoCoca.toString(),
                                      formazione: userFormazione.toString(),
                                      codiceCensimento: userCodiceCensimento.toString(),
                                      branca: userBranca.toString(),
                                      descrizione: userDescrizione.toString()
                                    }}
                                    component={AdminLayout} />
      <LoginRoute path="/auth" check={check} handleLoginApp={handleLoginApp} component={AuthLayout}  />

      {/*<Route path="/auth" handleLoginApp={handleLoginApp}
                          render={props => <AuthLayout {...props} 
                          check={check.toString()}
                          handleLoginApp={handleLoginApp}                         
    /> } />*/}
      <Redirect from="/" to="/auth/login" />
    </Switch>
  </BrowserRouter>
  );

}

export default withRouter(App);


ReactDOM.render(
  <App/>,  
  document.getElementById("root")
);




/*export default function App (props){
  const [isAuthenticated,userHasAuthenticated] = useState(false);
  return perro;
}


const perro = ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={props => <AdminLayout {...props}/>} />
      <Route path="/auth" render={props => <AuthLayout {...props} />} />
      <Redirect from="/" to="/auth/login" />
    </Switch>
  </BrowserRouter>,  
  document.getElementById("root")
);*/

/*class App extends React.Component{

  
  constructor(props){
    super(props);
  }

  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route path="/admin" render={props => <AdminLayout {...props}/>} />
          <Route path="/auth" render={props => <AuthLayout {...props} />} />
          <Redirect from="/" to="/auth/login" />
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));*/