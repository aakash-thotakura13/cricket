import { Suspense } from 'react';
import { Outlet } from 'react-router';

import HeaderComponent from './components/Header';

import './App.css';


function App() {

  return (
    <>

      <HeaderComponent />

      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>

    </>
  )
}

export default App;