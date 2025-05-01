import React from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
function App() {

  return (
    <>
       <BrowserRouter>
       <Routes>
        <Route path="/signup" element={<signup />} /> 
        <Route path="/signin" element={<signin />} /> 
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/send" element={<SendMoney />} /> 
       </Routes>
       </BrowserRouter>


    </>
  )

}

export default App
