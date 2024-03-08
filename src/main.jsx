import React, {useState, useContext, createContext} from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router, Routes, Route, Link, createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Home from './components/Home/Home';
import CountryDetails from './components/CountryDetails/CountryDetails';



export const DarkModeContext = createContext();



function AppLayout() {

  const [darkMode, setDarkmode] = useState(false);


  const handleClick = () => {
    setDarkmode(!darkMode);
  };    




  return ( 

    <DarkModeContext.Provider value={{ darkMode, handleClick }}>
    <div className={`w-full ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <nav className='w-full border-b-4 border-[#3e2863] p-4 px-6 m-0 flex items-center justify-between'>
        <div className='font-bold text-[2rem] max-[400px]:text-[1.1rem]'>
          Where in the World?
        </div>
        <div className='me-5'>
          <label className="relative inline-flex items-center cursor-pointer gap-2">
            <input className="sr-only peer" type="checkbox" onChange={handleClick}  />
            <div
              className="w-[2.5rem] h-10 rounded-full ring-0 peer duration-500 outline-none bg-gray-200 overflow-hidden before:flex before:items-center before:justify-center after:flex after:items-center after:justify-center before:content-['☀️'] before:absolute before:h-8 before:w-8 before:top-1/2 before:bg-white before:rounded-full before:left-1 before:-translate-y-1/2 before:transition-all before:duration-700 peer-checked:before:opacity-0 peer-checked:before:rotate-90 peer-checked:before:-translate-y-full shadow-lg shadow-gray-400 peer-checked:shadow-lg peer-checked:shadow-gray-700 peer-checked:bg-[#383838] after:content-['🌙'] after:absolute after:bg-[#1d1d1d] after:rounded-full after:top-[4px] after:left-[4.1px] after:translate-y-full after:w-8 after:h-8 after:opacity-0 after:transition-all after:duration-700 peer-checked:after:opacity-100 peer-checked:after:rotate-90 peer-checked:after:translate-y-0"
            ></div>
            <button className='text-sm duration-500 transition-colors' onClick={handleClick}>
              {darkMode ? 'Dark Mode' : 'Light Mode'}
            </button>
          </label>
        </div> 
      </nav>
      <Outlet />
    </div>
  </DarkModeContext.Provider>
  );
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />, 
    children: [ 
      { path: "/sleima-projet-api", element: <Home />, index: true },
      {path: "/country/:id" , element: <CountryDetails/>}
    ]
  }
]);
 







ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
