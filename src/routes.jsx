import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Contact } from "./pages/Contact";
import { AddContact } from "./pages/AddContact";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Contact /> },
      { path: "/add", element: <AddContact /> },
      { path: "/edit/:id", element: <AddContact /> }
    ]
  }
]);
