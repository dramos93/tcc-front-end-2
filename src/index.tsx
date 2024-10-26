import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import PrivateRoute from "./routes/PrivateRoute";
import CheckAuth from "./routes/CheckAuth";
import Login from "./pages/login";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
{/* <BrowserRouter>
</BrowserRouter> */}
