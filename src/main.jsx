import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard.jsx";
import Connexion from "./pages/connexion/connexion.jsx";
import Inscription from "./pages/inscription/inscription.jsx";
import toast, { Toaster } from 'react-hot-toast';
// import {QueryClient} from '@tanstack/react-query'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//etape1 configurer le serveur , installez  json-serveur , Mui design ,axios

const queryClient = new QueryClient();

const route = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/connexion",
    element: <Connexion />,
  },
  {
    path: "/inscription",
    element: <Inscription />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={route} />
    </QueryClientProvider>
  </React.StrictMode>
);
