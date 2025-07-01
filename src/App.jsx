import { useState, useEffect } from "react";
import Iflogin from "./pages/Iflogin";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
export const backendUrl = "https://ecommerce-backend-g6b5.onrender.com";

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  // Effect to set token in localStorage when it changes
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <>
      <ToastContainer />
      {token ? <Iflogin setToken={setToken} /> : <Login setToken={setToken} />}
    </>
  );
}

export default App;
