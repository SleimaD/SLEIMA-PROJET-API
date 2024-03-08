import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { DarkModeContext } from '../../main';
import { useNavigate } from 'react-router-dom';


export default function () {

  const [posts, setPosts] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [search, setSearch] = useState("");
  

  const { darkMode } = useContext(DarkModeContext);

  const navigate = useNavigate();



  useEffect(() => {
    axios.get(' https://restcountries.com/v3.1/all ')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


  const countryClick = (id) => {
    navigate(`/country/${id}`);
  };

  const filteredPosts = posts.filter(post =>
    (selectedRegion === 'All' || post.region === selectedRegion) &&
    post.name.common.toLowerCase().includes(search.toLowerCase())
  );  
  

  return (
    <div className={ `w-full p-4 bg-gray-100 flex flex-col gap-10 ${darkMode ? 'bg-[#000] text-white' : 'bg-[#eee] text-black'}` }>
        <div className=' mt-5 p-2 '>

        <form class="flex justify-between p-5 max-[400px]:flex-col max-[400px]:gap-5">   
        <label for="default-search" class="mb-2 text-sm text-gray-900 sr-only dark:text-white">Search</label>
        <div class="relative w-[60%]">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-600 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="search" id="default-search" className="block w-[100%] p-4 ps-12 text-sm text-gray-500 border-[3px] border-gray-200 rounded-[20px] bg-gray-50 focus:ring-[#1c0f33] focus:border-[#1c0f33]  dark:border-[#4b3b66] dark:placeholder-gray-400 max-[400px]:dark:placeholder-[0.1rem] outline-[#1c0f33]" placeholder="Search for a country" required  onChange={(e)=> setSearch(e.target.value)} />
            {/* <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
        </div>

          <select className="block w-[10%] max-[400px]:w-[50%] p-2 text-sm me-8 text-gray-500 border-[3px] border-gray-200 rounded-[20px]  bg-gray-50 focus:ring-[#1c0f33] focus:border-[#1c0f33] dark:border-[#4b3b66] dark:bg-[#3e2748] dark:text-white cursor-pointer "  value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}>
            <option value="" className=' ' disabled>Select Region</option>  
            <option value="All" >All</option>             
            <option value="Africa">Africa</option>
            <option value="Americas" >Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>  
        </select>  


        </form>



                   

        </div>

        <div className=' mt-10 p-4'>
          <ul className=' list-none grid grid-cols-3 justify-center w-full h-[100%] p-3 justify-items-center max-[400px]:grid-cols-1'>
          {filteredPosts.map((element, index) => (
            <li key={index} className=' mb-[5rem]'         onClick={() => countryClick(element.name.common)}
 >
              {/* {element.name.official} */}
              <div
                  class="relative rounded-lg -skew-x-6  -translate-y-6 hover:-translate-y-1 hover:-translate-x-0 hover:skew-x-0 w-[22rem] h-[24.2rem] p-2 bg-white card-compact hover:bg-base-200 transition-all duration-500 [box-shadow:12px_12px] hover:[box-shadow:4px_4px] overflow-hidden max-[400px]:w-[13rem]"
                >
                  <figure class="w-full h-full">
                    <div
                      alt=""
                      class="bg-[#1c0f33] text-neutral-50 min-h-full rounded-lg border border-opacity-5"
                    > <div className=' w-[100%] h-[12rem]'>
                      <img src={element.flags.png} className=' w-full h-full object-cover' alt="" />
                    </div></div>
                  </figure>
                  
                  <div class="absolute text-neutral-50 bottom-4 left-0 px-5 p-2 flex flex-col gap-2">
                    
                    <span class="font-bold text-[1.3rem] ">{element.name.official}</span>
                    <p class="text-sm text-gray-400 line-clamp-2 flex flex-col">
                      <span>Population: &nbsp; <span className=' font-normal text-white'>{element.population} &nbsp; inhabitants </span></span>
                      <span>Region: &nbsp; <span className=' font-normal text-white'>{element.region} </span> </span>
                      <span>Capital:  &nbsp; <span className=' font-normal text-white'>{element.capital} </span></span>
                    </p>
                  </div>
                </div>

            </li>
          ))}
        </ul>

        </div>
            
       
        
    </div>
  )
}
