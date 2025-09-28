import React from 'react'
import Animation from './components/Animation'
import Category from './components/Category'
import HoneyPage from './components/HoneyPage'

const page = () => {
  return (
    <div className='mt-16 bg-gradient-to-br relative bg-fixed from-yellow-100 via-yellow-200 to-yellow-50'>

      <div className="fixed -top-10 -left-20 sm:w-60 sm:h-60 w-52 h-52 bg-yellow-200 rounded-full mix-blend-multiply opacity-40 z-10 animate-pulse"></div>
      <div className="fixed -bottom-20 -right-20 sm:w-60 sm:h-60 w-52 h-52 bg-yellow-300 rounded-full mix-blend-multiply opacity-40 z-10 animate-pulse"></div>

      <div className='mx-auto flex flex-col sm:w-10/12 w-full gap-y-5 sm:px-4 sm:pt-4'>
        <Animation />
        <Category />
        <HoneyPage />
      </div>
      
    </div>
  )
}

export default page