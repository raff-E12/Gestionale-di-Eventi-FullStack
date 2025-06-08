import React, { createContext, useContext, useState } from 'react'
import axios from "axios"
import cookie from "js-cookie"
import { useEffect } from 'react';
import { Context_Api } from './AccountingContext';
import links from "../js/links"
import { useNavigate } from 'react-router';

const Calendar_Context = createContext();

function Export_Calendar({children}) {
  const { isEmail, setEmail } = Context_Api();
  const [isEvents, setEvents] = useState([]);
  const [isFilter, setFilter] = useState([]);

  // Stato degli eventi
  const [isTitle, setTitle] = useState("");
  const [isDescription, setDescription] = useState("");
  const [isStart, setStart] = useState("");
  const [isEnd, setEnd] = useState("");
  const [idEvents, setIDEvents] = useState(0);

  // Status del server in sessione.
  const [isStatus, setStatus] = useState([]);
  const [isList, setList] = useState([]);

  const [isModified, setModified] = useState(false);
  const [isDrag, setDrag] = useState(false);

  const navigete = useNavigate();

  // Tutti gli eventi in lista
  async function Calendar_list() {
    try {
      const url = links.calendar.all;
      const fetch = await axios.get(url);
      const data = fetch.data;
      setEvents(data.events);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Eventi per ogni Aministatore
  async function Calendar_Users() {
    try {

      // const cookie_token = cookie.get("Authorization");

      // if (isEmail === "") {
      //   const extract = cookie_token.split(".")[1];
      //   const decompile = atob(extract);
      //   const json_Parse = JSON.parse(decompile);
      //   setEmail(json_Parse.data);
      //   return isEmail
      // }

      const email_user = { email: isEmail };

      const url = links.calendar.users;
      const fetch_api = await axios.post(url, email_user, {withCredentials: true});
      const data = fetch_api.data;
      // console.log(data);
      setFilter(data.events);

    } catch (error) {
       if (axios.isAxiosError(error)) {
         if (error.code === 401) {
            window.alert("Accesso Scaduto, Devi autenticarti!!");
            navigete("/");
         }
       }
    }
  }

  // Eventi in Aggiunta
  async function Add_Calendar_Users() {
    try {
      
      // if (isEmail === "") {
      //   const extract = cookie_token.split(".")[1];
      //   const decompile = atob(extract);
      //   const json_Parse = JSON.parse(decompile);
      //   setEmail(json_Parse.data);
      //   return isEmail
      // }


      const object_composition = {
        title: isTitle, 
        description: isDescription, 
        start: isStart, 
        end: isEnd, 
        organizer: isEmail
      }

      
      // console.log(object_composition);

      const url = links.calendar.add;
      const fetch = await axios.post(url, object_composition, {withCredentials: true});
      const data = fetch.data;
      console.log(data);

      if (data.code === 200) {
        window.alert("Evento aggiunto con successo!!");
        navigete("/");
      }
      
    } catch (error) {

      throw new Error(error.message);

    } finally {

      setTitle("");
      setDescription("");
      setStart("");
      setEnd("");

    }
  }

  // Eventi da Rimuovere
  async function Delete_Events(id) {
    try {
      const id_event = JSON.parse(id); // Restituisce uno oggetto

      const url = `${links.calendar.delete}/:${id_event}`;
      const fetch = await axios.delete(url, {withCredentials: true});
      const data = fetch.data;

      if (data.code === 200) {
        window.alert("Evento Rimosso con successo");
        return navigete("/user/profile");
      }

    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }


  async function Status_Users(){
    try {
      const url = links.users.status;
      const fetch = await axios.post(url, {email: isEmail}, {withCredentials: true});
      const data = fetch.data;

      setStatus(data.status);
      setList(data.events);
    } catch (error) {
      if (axios.isAxiosError(error)) {
         if (error.code === 401) {
            window.alert("Accesso Scaduto, Devi autenticarti!!");
            navigete("/");
         }
       }
    } finally {
      Calendar_Users()
    }
  }

// Funzione di Drag&Drop del componente evento.
  async function DragModDate(){
    try {
      if (isDrag) {
        const url = `${links.calendar.upadate}/:${idEvents}`;
        const fetch = await axios.patch(url, { start: isStart, end: isEnd }, { withCredentials: true });
        const data = fetch.data;

        if (data.code === 200) {
            setModified(true);
            console.log(data);
            window.alert("Evento modificato con successo!!");
        }

      }
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    } finally {
      setDrag(false);
      setStart("");
      setEnd("");
      setIDEvents(0);
    }
  }

  async function Upadate_Events() {
    try {
      const url = links.calendar.upadate;
      const fetch = await axios.patch(url, { id: idEvents, title: isTitle, 
        description: isDescription, start: isStart, end: isEnd}, { withCredentials: true });
      const data = fetch.data;

      if (data.code === 200) {
        window.alert("Evento è stato aggiornato");
        navigete("/dashboard");
      }
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    } finally {
      Calendar_Users();
      setIDEvents("")
      setTitle("");
      setDescription("");
      setStart("");
      setEnd("");
    }
  }
  
  useEffect(() =>{ Calendar_Users() }, []);
  useEffect(() =>{ Calendar_list() }, []);
  useEffect(() => { DragModDate() }, [isDrag]);
  useEffect(() =>{ Status_Users() }, [isEmail, isEvents]);

  const exports_values = {
    isEvents,
    setEvents,
    isFilter,
    setFilter,
    isTitle,
    setTitle,
    isDescription,
    setDescription,
    isStart,
    setStart,
    isEnd,
    setEnd,
    Add_Calendar_Users,
    Delete_Events,
    isStatus,
    setStatus,
    setList,
    isList,
    idEvents, 
    setIDEvents,
    isModified, 
    setModified,
    isDrag, 
    setDrag,
    Upadate_Events
  }

  return(<>
    <Calendar_Context.Provider value={exports_values}>
      {children}
    </Calendar_Context.Provider>
    </>)    
}

function Calendar_Api(){
    const import_context = useContext(Calendar_Context);
    return import_context
}

export { Export_Calendar, Calendar_Api }