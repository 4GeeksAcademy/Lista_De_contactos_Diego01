import React, { createContext, useContext, useReducer, useEffect } from "react";
export const Context = createContext(null);
const initialState = { contacts: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CONTACTS":
      return { ...state, contacts: action.payload };
    default:
      return state;
  }
};

export const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialState);

  const AGENDA = "agenda_de_estudiante_pro_2024"; 
  const BASE_URL = "https://playground.4geeks.com/contact";

  const getContacts = async () => {
    try {
      const resp = await fetch(`${BASE_URL}/agendas/${AGENDA}/contacts`);
      if (resp.status === 404) {
        await createAgenda();
      } else if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: "SET_CONTACTS", payload: data.contacts || [] });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createAgenda = async () => {
    try {
      const resp = await fetch(`${BASE_URL}/agendas/${AGENDA}`, { method: "POST" });
      if (resp.ok) getContacts();
    } catch (error) {
      console.error(error);
    }
  };

  const addContact = async (contact) => {
    try {
      const resp = await fetch(`${BASE_URL}/agendas/${AGENDA}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact)
      });
      if (resp.ok) await getContacts();
    } catch (error) {
      console.error(error);
    }
  };

  const updateContact = async (id, contact) => {
    try {
      const resp = await fetch(`${BASE_URL}/agendas/${AGENDA}/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact)
      });
      if (resp.ok) await getContacts();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteContact = async (id) => {
    try {
      const resp = await fetch(`${BASE_URL}/agendas/${AGENDA}/contacts/${id}`, { method: "DELETE" });
      if (resp.ok) await getContacts();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <Context.Provider value={{ store, actions: { getContacts, addContact, updateContact, deleteContact } }}>
      {children}
    </Context.Provider>
  );
};

export const useStore = () => useContext(Context);