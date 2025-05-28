import React from 'react'
import SearchInput from './SearchInput'
import WeatherDisplay from './WeatherDisplay'

const MainLayout = () => {

  return (
    <div className='p-2 rounded-2xl  border-1 border-gray-100'>
        <SearchInput />
        <WeatherDisplay />
    </div>
  )
}

export default MainLayout