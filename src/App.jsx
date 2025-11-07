
import { Outlet } from 'react-router';
import HeaderComponent from './components/Header';

import './App.css';


function App() {

  return (
    <>

    <HeaderComponent />

    <Outlet />

    </>
  )
}

export default App;