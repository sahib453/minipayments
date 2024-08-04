import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';



const Dashboard = React.lazy(()=>import('./frontend/Dashboard'))
const Signup = React.lazy(()=>import('./frontend/Signup'))
const Signin = React.lazy(()=>import('./frontend/Signin'))
const Send = React.lazy(()=>import('./frontend/Send'))




function App() {
  return (
    <BrowserRouter>
      <Routes>
              <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path='/signup' element={<Suspense fallback={'Loading...'}><Signup /></Suspense>}/>
        <Route path='/dashboard' element={<Suspense fallback={'Loading...'}> <Dashboard/> </Suspense> } />
        <Route path='/signin' element={<Suspense fallback={"Loading..."} ><Signin/></Suspense>} />
        <Route path='/send' element={<Suspense fallback={"Loading..."} ><Send/></Suspense>} />





      </Routes>
    </BrowserRouter>
  );
}

export default App;
