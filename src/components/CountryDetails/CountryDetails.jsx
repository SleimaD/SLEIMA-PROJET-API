import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import "./CountryDetails.css"






export default function CountryDetails() {


    const [countryDetails, setCountryDetails] = useState(null); // state to store country details

    const { id } = useParams(); // Getting the country ID from the URL parameters
    const navigate = useNavigate();

    useEffect(() => { // Effect hook to fetch country details on component mount or ID change
        setCountryDetails(null);
        axios.get(`https://restcountries.com/v3.1/name/${id}`) // Fetch country details by ID
          .then(response => {
            setCountryDetails(response.data[0]);  // Set country details with the first item from the response
          })
          .catch(error => {
            console.error('Error fetching country details:', error);
          });
    }, [id]); // Dependency array includes ID, so this effect runs whenever ID changes


    if (!countryDetails) {
        return <div>Loading...</div>;
    }

    // Function to format languages into a string
    let getLanguages = (e) => {
        return Object.values(e).join(', '); 
    };

    let getCurrencies = (currencies) => {  // Function to format currencies into a string
        return currencies
          ? Object.values(currencies).map(currency => `${currency.name} (${currency.symbol})`).join(', ')
          : '';
    };


  return (
    <div className="p-4 w-full h-full sm:h-screen ">
      <div className=' p-6'>
        <button onClick={() => navigate(-1)} className="flex justify-center items-center gap-2 w-28 h-10 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#7255a3] via-[#4e13b3] to-[#3e2863] hover:shadow-xl hover:shadow-[#7b62a7] hover:scale-105 duration-300 hover:from-[#6b1cf2] hover:to-[#3e2863]">
            &larr; Back
        </button>
      </div>


      {/* // Container for country details */}
    <div className=' flex flex-col gap-4 justify-center '> 
        
        <div className='flex justify-center max-[400px]:flex-col'>

        {/* // Container for 3D country flag */}
            <div className="cube-container ml-0 w-40 h-40 sm:w-64 sm:h-64"> 
                <div className="cube">
                    <div className="face front"><img src={countryDetails.flags.png} alt="" className=' h-[100%]' /></div>
                    <div className="face back">
                        <img src={countryDetails.flags.png} alt="" className=' h-[100%]' />
                    </div>
                    <div className="face right">
                        <img src={countryDetails.flags.png} alt="" className=' h-[100%]' />
                    </div>
                    <div className="face left">
                        <img src={countryDetails.flags.png} alt="" className=' h-[100%]' />
                    </div>
                    <div className="face top">
                        <img src={countryDetails.flags.png} alt="" className=' h-[100%]' />
                    </div>
                    <div className="face bottom">
                        <img src={countryDetails.flags.png} alt="" className=' h-[100%]' />
                    </div>
                </div>
            </div>

            <div className='infos rounded-lg shadow-2xl shadow-[#a56cc2] p-5 max-w-md sm:max-w-none hover:shadow-lg hover:shadow-[#a56cc2]'>

               <h1> {countryDetails.name.official}</h1> 

                <div className=' flex p-2 mt-5 mb-5 gap-12'>
                    <div>
                        <p> Native name : {countryDetails.name.common} </p> 
                        <p>Population : {countryDetails.population}</p>
                        <p>Region : {countryDetails.region}</p>
                        <p>Sub Region : {countryDetails.subregion}</p>
                        <p>Capital : {countryDetails.capital}</p>
                    </div>

                    <div>
                        <p>Top Level Domain : {countryDetails.tld}</p>
                        <p>Currencies : {getCurrencies(countryDetails.currencies)}</p>
                        <p>Languages : {getLanguages(countryDetails.languages)}</p> 
                    </div>

                </div>

                
                <div className=' flex items-center gap-3'>
                    <h2 className="font-bold ">Border Countries:</h2>
                    <div className="flex flex-wrap gap-2">
                    {countryDetails.borders && countryDetails.borders.length > 0 ? (
                        countryDetails.borders.map((border, index) => (
                            <Link key={index} to={`/country/${border}`}
                                className="bg-[#431558] hover:bg-[#150a21] hover:shadow-[#7b62a7] hover:shadow-lg text-white font-bold py-1 px-6 rounded">
                            {border}
                            </Link>
                        ))
                        ) : (
                        <p>None</p> 

                        )}
                </div>

            </div>


            </div>


        </div>


        </div>
    </div>  
    )
}
