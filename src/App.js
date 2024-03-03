import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Suspense,lazy } from 'react';
const HomePage = lazy(()=>import('./Components/HomePage.js'));
const Final = lazy(()=> import('./Components/Final.js'))


function App() {
  const [pincode, setPincode] = useState("");

  return (
    <div className="App">
      
        <Routes>
          <Route path="/" element={<HomePage setPincode={setPincode} />} />
          <Route path="/output" element={<Suspense fallback={<p>Loading... Information</p>}><Final pincode={pincode} /></Suspense>} />
          
        </Routes>
     
    </div>
  );
}

export default App;