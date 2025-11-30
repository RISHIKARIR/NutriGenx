import React from "react";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Getstarted from './Getstarted'
import Details from './Details'
import {BrowserRouter,Routes,Route,} from "react-router-dom";
import Generating from "./Generating";
import Results from "./Results";


function App() {
  return(<>
  <BrowserRouter>
<Routes>
<Route path="/" element={<Getstarted/>}></Route>
<Route path="/Details" element= {<Details/>}></Route>
<Route path="/Generate" element={<Generating/>}></Route>
<Route path="/Result" element={<Results/>}></Route>


</Routes>

</BrowserRouter>
  </>)
}
export default App
