import {useState} from "react";
import "./App.css";
import MainLayout from "./Components/MainLayout";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="main">
        <ToastContainer />
        <MainLayout />
      </div>
    </>
  );
}

export default App;
