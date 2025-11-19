import { Suspense } from 'react';
import { Outlet } from 'react-router';

import HeaderComponent from './components/Header';

import './App.css';


function App() {

  return (
    <>

      <HeaderComponent />

      <section style={{ padding: "0em 0.5em", }}>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </section>

    </>
  )
}

export default App;