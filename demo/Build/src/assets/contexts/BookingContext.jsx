import React, { createContext, useContext, useState } from 'react'
import axios, { AxiosError } from "axios"
import cookie from "js-cookie"
import { useEffect } from 'react';
import { Context_Api } from './AccountingContext';
import links from "../js/links"
import { data, useNavigate } from 'react-router';

const Booking_Context = createContext();

function Export_Booking({children}) {
    const [isBooking, setBooking] = useState([]);
    const [isSubmit, setSubmit] = useState(false);

    // ID del evento.
    const [isID, setID] = useState(null);
    
    // Stati di evento e prenotazione
    const [isState, setState] = useState({});
    const [isOrder, setOrder] = useState({});

    // Stabilimento stato di prenotazione
    const [isTrue, setTrue] = useState(false);
    const navigate = useNavigate();

    const { isEmail, isAccess } = Context_Api();

    // Imporato lista di Booking in base all'email utente
    async function Booking_List() {
        try {
            const url = links.booking.events;
            const obj = {email: isEmail};
            const fetch = await axios.post(url, obj, {withCredentials: true});
            const data = fetch.data;

            if (data.code === 200) {
                setBooking(fetch.data.booking);
                // navigate("/booking/booked")
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.status === 404) {
                   console.log(error);
                }
            }
        }
    }

    // Aggiunta di Booking in base agli eventi
    async function Add_Booking(){
      try {

        if (isSubmit) {
            console.log(isID);
            console.log(isSubmit)

            const url = links.booking.add;
            const id_state = isState[isID];
            const obj = {id: isID, utente: isEmail, state: id_state};
            console.log(obj)
            const fetch = await axios.post(url, obj, {withCredentials: true});
            const data = fetch.data;
            console.log(data);

            if (data.code === 200) {
            window.alert("Prenotato con sucesso");
            // navigate("/user/profile");
            if (isTrue !== false) { // Verifica se è stato prenotato, solo è diverso da true.
                Booking_List();
                setID(null)
                setSubmit(false);
                return setTrue(false);
            } else{
                return setTrue(true);
           }
        }
        }

      } catch (error) {
        console.log(error);
        throw new Error(error.message);
      }
    }

    // Recupero Informazioni di Prenotazione
    async function Recovry_Events(){
        try {
            const obj = { email: isEmail };
            const url = links.booking.verify;
            const fetch = await axios.post(url, obj, {withCredentials: true}); // Mostra i cookie
            const data = fetch.data;

            if (data.code === 200) {
                const result = data.events;
                sessionStorage.setItem("events", JSON.stringify(result));
                console.log("Avvenuto con successo");
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.status === 404) {
                   return sessionStorage.setItem("events", JSON.stringify({}));
                }
            }
        }
    }

    useEffect(() => { Recovry_Events() }, [isAccess]);
    useEffect(() => { Booking_List() } ,[isEmail]);
    useEffect(() => { Add_Booking() } ,[isSubmit]);

    const export_values = {
        isBooking,
        setBooking,
        isSubmit,
        setSubmit,
        setID,
        isID,
        Add_Booking,
        isState, 
        setState,
        isOrder,
        setOrder,
        isTrue, 
        setTrue
    }
 
  return(<>
    <Booking_Context.Provider value={export_values}>
      {children}
    </Booking_Context.Provider>
    </>)    
}

function Booking_Api(){
    const import_context = useContext(Booking_Context);
    return import_context
}

export { Export_Booking, Booking_Api }