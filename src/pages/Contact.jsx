import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../hooks/useGlobalReducer";
import ContactCard from "../components/ContactCard";


export const Contact = () => {
    const { store, actions } = useStore();

    useEffect(() => {
        actions.getContacts();
    }, []);

    return (
        <div className="container mt-4">
            <Link to="/add" className="btn btn-success mb-3">
                Add new contact
            </Link>

            <div className="contact-container">
                {store.contacts.map(contact => (
                    <ContactCard key={contact.id} contact={contact} />
                ))}
            </div>
        </div>
    );
};
