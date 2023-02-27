import { createContext, useState } from "react";
import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import AddMovie from "./Component/AddMovie";
import Cards from "./Component/Cards";
import Detail from "./Component/Detail";
import Header from "./Component/Header";
import Login from "./Component/Login";
import SignUp from "./Component/SignUp";


const Appstate = createContext()


function App() {
  const[login,setLogin] = useState(false)
const [ userName,setUserName] = useState('')

  return (
    <Appstate.Provider value = {{login,setLogin, userName,setUserName}}>
    <div className="app relative">
        <Header />
        <Routes>
          <Route path="/" element={<Cards />} />
          <Route path="/addmovie" element={<AddMovie />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
    </div>
    </Appstate.Provider>
  );
}

export default App;
export {Appstate};
