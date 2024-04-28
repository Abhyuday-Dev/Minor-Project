
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AppBar from './Components/AppBar';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';

import Home from './Pages/Home';
import {React,useState,useEffect} from 'react';
import { userState } from './store/atoms/user.js';
import {
  RecoilRoot,
  useSetRecoilState
} from 'recoil';
import {BASE_URL} from "./config.js";
import axios
 from 'axios';
import Main from './Pages/Main.jsx';

function App() {
  return (
    <RecoilRoot>
    <div className="App" >
      <BrowserRouter>
      <AppBar />
      <InitUser />
        <Routes>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<SignIn />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
    </RecoilRoot>
  );
}


function InitUser() {
  const setUser = useSetRecoilState(userState);
  const init = async() => {
      try {
          const response = await axios.get(`${BASE_URL}/admin/me`, {
              headers: {
                  "Authorization": "Bearer " + localStorage.getItem("token")
              }
          })

          if (response.data.username) {
              setUser({
                  isLoading: false,
                  userEmail: response.data.username,
                  userName: response.data.name
              })
          } else {
              setUser({
                  isLoading: false,
                  userEmail: null
              })
          }
      } catch (e) {

          setUser({
              isLoading: false,
              userEmail: null
          })
      }
  };

  useEffect(() => {
      init();
  }, []);

  return <></>
}

export default App;
