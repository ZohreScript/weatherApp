import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  IoMdSunny, IoMdRainy,
  IoMdCloudy, IoMdSnow, IoMdThunderstorm
  , IoMdSearch
} from 'react-icons/io';
import {
  BsCloudHaze2Fill, BsCloudDrizzleFill, BsEye, BsWater,
  BsThermometer, BsWind
} from 'react-icons/bs';
import { RiCelsiusFill } from 'react-icons/ri';
import { ImSpinner } from 'react-icons/im';


const APIkey = 'f119dc4a76c37a39bad93742dca0b185'
const App = () => {
  const [data, setDate] = useState(null);
  const [location, setLocation] = useState('Iran');
  const [inputValue, setInputValue] = useState('')
  const [animate, setAnimate] = useState(false)
const[loading, setLoading] = useState(false)

  const handleInput = (e) => {
    setInputValue(e.target.value);
  }

  const handleSubmit = (e) => {
    console.log(inputValue);
    if (inputValue !== '') {
      setLocation(inputValue);
    }

    const input = document.querySelector('input');


    if (input.value !== '') {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false)
      }, 500);
    }

    input.value = '';

    e.preventDefault();
  }

  //fetch data
  useEffect(() => {
    setLoading(true);
    const url = `https://api.openweathermap.org/
data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`

    axios.get(url).then((res) => {
     setTimeout(()=>{
      setDate(res.data);
      setLoading(false);
     },1500)
    })

  }, [location])
  console.log(data)

  if (!data) {
    return (
      <div>
        <div>
          <ImSpinner className='text-5xl animate-spin' />
        </div>
      </div>
    )
  }

  //set icon according to the weather
  let icon;
  console.log(data.weather[0].main);

  switch (data.weather[0].main) {
    case 'Clouds': icon = <IoMdCloudy />; break;
    case 'Haze': icon = <BsCloudHaze2Fill />; break;
    case 'Rain': icon = <IoMdRainy />; break;
    case 'Clear': icon = <IoMdSunny />; break;
    case 'Drizzle': icon = <BsCloudDrizzleFill />; break;
    case 'Snow': icon = <IoMdSnow />; break;
    case 'Thunderstorm': icon = <IoMdThunderstorm />; break;
  }

  const date = new Date();

  return (
    <div className='w-full h-screen  overflow-hidden  bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0'>
      {/* form */}
      <form
        className={`${animate ? 'animate-shake' : 'animate-none'}h-16 bg-black/30 w-full max-w-[350px] rounded-full backdrop-blur-[32px] mb-8`}>
        <div className='h-full relative flex items-center justify-between p-2'>
          <input
            onChange={(e) => handleInput(e)}
            className='flex-1 bg-transparent outline-none placeholder:text-gray-50 text-gray-50 text-[15px] font-light pl-6 h-full
          '
            type='text' placeholder='Search by city or country' />
          <button
            onClick={(e) => handleSubmit(e)}
            className='bg-cyan-500 hover:bg-cyan-700 w-20 h-12 rounded-full flex justify-center items-center transition'>
            <IoMdSearch className='text-2xl text-white' />
          </button>
        </div>
      </form>
      {/* card */}
      <div className='w-full max-w-[350px] bg-black/20 min-h-[350px] text-white backdrop-blur-[32px] rounded-2xl py-4 px-6'>
        <div>
          {/* card top */}
          <div>
            {/* icon */}
            <div className='text-[87px]'>{icon}</div>
            <div>
              {/* country name */}
              <div className='text-2xl font-bold'>{data.name},{data.sys.country}</div>
              {/* date */}
              <div>
                {date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()}
              </div>
            </div>
          </div>
          {/* card body */}
          <div className='my-8'>
            <div className='flex justify-center items-center'>
              {/* temp */}
              <div className='text-[144px] leading-none font-light'>{parseInt(data.main.temp)}</div>
              {/* celsius icon */}
              <div className='text-4xl'>
                <RiCelsiusFill />
              </div>
            </div>
            {/* weather description */}
            <div className='capitalize text-center'>
              {data.weather[0].description}
            </div>
          </div>
          {/* card bottom */}
          <div className='max-w-[378px] mx-auto flex flex-col gap-y-6'>
            <div className='flex justify-between'>
              <div className='flex items-center gap-x-2'>
                {/* icon */}
                <div className='text-[20px]'>
                  <BsEye />
                </div>
                <div>
                  Visibility{' '}
                  <span className='ml-2'>{data.visibility / 1000}km</span>
                </div>
              </div>
              <div className='flex items-center gap-x-2'>
                {/* icon */}
                <div className='text-[20px]'>
                  <BsThermometer />
                </div>
                <div className='flex'>
                  Feels like
                  <div className='flex ml-2'>{parseInt(data.main.feels_like)}</div>
                  <RiCelsiusFill />
                </div>
              </div>
            </div>

            <div className='flex justify-between'>
              <div className='flex items-center gap-x-2'>
                {/* icon */}
                <div className='text-[20px]'>
                  <BsWater />
                </div>
                <div>
                  Humidity
                  <span className='ml-2'>{data.main.humidity}%</span>
                </div>
              </div>
              <div className='flex items-center gap-x-2'>
                {/* icon */}
                <div className='text-[20px]'>
                  <BsWind />
                </div>
                <div> Wind <span className='ml-2'>{data.wind.speed} m/s</span> </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default App;
