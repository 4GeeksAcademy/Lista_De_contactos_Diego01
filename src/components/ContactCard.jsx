import { Link } from "react-router-dom";
import { useStore } from "../hooks/useGlobalReducer";

const ContactCard = ({ contact }) => {
    const { actions } = useStore();

    return (
        <div className="card p-3 mb-2">
            <h5>{contact.name}</h5>
            <p>{contact.email}</p>
            <p>{contact.phone}</p>
            <p>{contact.address}</p>

            <Link
                to={`/edit/${contact.id}`}
                className="btn btn-primary me-2"
            >
                Edit
            </Link>

            <button
                className="btn btn-danger"
                onClick={() => {
                    if (confirm("Estas seguro/a de que quieres eliminar este contacto?")) {
                        actions.deleteContact(contact.id);
                    }
                }}
            >
                Delete
            </button>
        </div>
    );
};

export default ContactCard;
