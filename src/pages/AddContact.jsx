import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useStore } from "../hooks/useGlobalReducer";

export const AddContact = () => {
    const { store, actions } = useStore();
    const navigate = useNavigate();
    const { id } = useParams();

    const [form, setForm] = useState({ 
        name: "", 
        email: "", 
        phone: "", 
        address: "" 
    });

    useEffect(() => {
        if (id && store.contacts.length > 0) {
            const contact = store.contacts.find(c => String(c.id) === String(id));
            if (contact) {
                setForm({
                    name: contact.name || "",
                    email: contact.email || "",
                    phone: contact.phone || "",
                    address: contact.address || ""
                });
            }
        }
    }, [id, store.contacts]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await actions.updateContact(id, form);
            } else {
                await actions.addContact(form);
            }
            navigate("/");
        } catch (error) {
            console.error("Error saving contact:", error);
        }
    };

    return (
        <div className="container py-5" style={{ maxWidth: "600px" }}>
            <div className="glass-card p-5">
                <h2 className="fw-bold mb-4 text-center">{id ? "Editar" : "Crear"} Contacto</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label small fw-bold text-secondary">Nombre Completo</label>
                        <input
                            className="form-control input-custom"
                            placeholder="Ej. Jane Doe"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label small fw-bold text-secondary">Email</label>
                        <input
                            type="email"
                            className="form-control input-custom"
                            placeholder="jane@example.com"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label small fw-bold text-secondary">Teléfono</label>
                        <input
                            className="form-control input-custom"
                            placeholder="+1 555-0000"
                            value={form.phone}
                            onChange={e => setForm({ ...form, phone: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label small fw-bold text-secondary">Dirección</label>
                        <input
                            className="form-control input-custom"
                            placeholder="Calle Falsa 123"
                            value={form.address}
                            onChange={e => setForm({ ...form, address: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-gradient w-100 py-3 mt-3 shadow">
                        Guardar Contacto
                    </button>
                    <Link to="/" className="d-block text-center mt-4 text-muted text-decoration-none small">
                        ← Volver a la lista
                    </Link>
                </form>
            </div>
        </div>
    );
};