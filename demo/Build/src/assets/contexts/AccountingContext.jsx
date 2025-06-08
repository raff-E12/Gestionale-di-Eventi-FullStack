import React, { createContext, useContext, useEffect, useState } from 'react'
import axios, { Axios, AxiosError, AxiosHeaders } from "axios"
import cookie from "js-cookie"
import { data, Navigate, useNavigate } from 'react-router';
import links from "../js/links"

const Api_Context = createContext();

function ApiContext({children}) {
  const [isUser, setUser] = useState("");
  const [isEmail, setEmail] = useState("");
  const [isPassword, setPassword] = useState("");
  const [isRule, setRule] = useState("");
  
  // Logica di accesso
  const [isAccess, setAccess] = useState(false);

  //Risultato in caricamento e rindirizzamento Link
  const [isSubmit, setSubmit] = useState(false); 
  const navigate = useNavigate();

  // Recupero informazioni di accesso
  function Users_Recovery() {
    if (cookie.get("Authorization") !== "" && cookie.get("Authorization") !== undefined) {
      const token = cookie.get("Authorization").split(".")[1];
      const decript = JSON.parse(atob(token));
      console.log(decript);

      if (isEmail === "" || isEmail !== "" && isUser === "" && isRule === "") {
        setEmail(decript.email);
        setUser(decript.name);
        setRule(decript.role);
        console.log(isEmail, isUser)
      }
    }
  }
    
  // Gestione Registrazione Utente
  async function Register_users() {
    if (isSubmit) {
      return setSubmit(true)
    }
    try {
      console.log(isUser, isEmail, isPassword);
      const object_req = { name: isUser, email: isEmail, password: isPassword, ruolo: isRule };
      if (isUser !== "" && isEmail !== "" && isPassword !== "" && isRule !== "") {
        const fetch = await axios.post(links.users.register, object_req);
        const token = fetch.data.token;
        // Creazione del cookie
        cookie.set("Authorization", token, {expires: 1, path:"/", sameSite: "Lax"});
        setAccess(true);
        navigate("/")

       return window.alert("Registrato con successo!!");
      } else{
        return window.alert("compila i campi");
      }
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) { // gestione errori axios
          if (error.status === 400) {
             return window.alert("L'email esiste già!!");
          }
        }
    } finally{
      setSubmit(false);
    }
  }

    //Gestione Accesso Utente
    async function Login_users() {
    
    if (isSubmit) {
      return setSubmit(true);
    }

    try {

      const url = links.users.login;
      const object_req = { email: isEmail, password: isPassword };
      const config =  { withCredentials: true } // Condivisione Cookie
      const fetch = await axios.post(url, object_req, config);
      const data_result = fetch.data;

      if (data_result.code === 200) {
        window.alert("Autenticato con successo!!");
        setAccess(true);
        const token = fetch.data.token;
        const role = fetch.data.role;
        cookie.set("Authorization", token, {expires: 1, path:"/", sameSite: "Lax"});
        setRule(role);
        navigate("/");
        return Users_Recovery();
      }

    } catch (error) {
      console.log(error);
        if (axios.isAxiosError(error)) {
            const status = error.response.status;
            console.log(status);
            const list_status = [403, 404, 401, 400];
            console.log(list_status.includes(status));
         if (list_status.find(value => value === 400 || value === 404)) {
              setEmail("");
              setPassword("");
              return window.alert("Accesso inesistente, Registrati Ora!!");
          }
        }
    } finally{
      setSubmit(false);
      Users_Recovery();
    }
  }

  // Gestione Logout Utente
  function Logout_Account() {
    cookie.remove("Authorization");
    sessionStorage.setItem("events", JSON.stringify({}));
    setAccess(false);
    navigate("/");
    setPassword("");
    setEmail("");
    setUser("");
    setRule("");
  }

  // Prevenzione di Accesso
  function Access_verify(){
    const cookie_token = cookie.get("Authorization");
    // console.log(cookie_token);
    if (cookie_token !== "" && cookie_token === undefined) {
      window.alert("Accesso Scaduto, Ti devi autenticare!!");
      navigate("/")
      return setAccess(false);
    } else{
      return setAccess(true);
    }
  }

  useEffect(() => { Access_verify() }, []);
  useEffect(() => { Users_Recovery() }, []);

  const export_value = {
    isUser,
    setUser,
    isEmail,
    setEmail,
    isPassword,
    setPassword,
    Register_users,
    Login_users,
    isAccess,
    isRule,
    setRule,
    Logout_Account
  }

  return(<>
    <Api_Context.Provider value={export_value}>
      {children}
    </Api_Context.Provider>
    </>)    
}

function Context_Api(){
    const import_context = useContext(Api_Context)
    return import_context
}

export { ApiContext, Context_Api }