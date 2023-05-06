import React from 'react'

export const LoadingScreen = () => {
  return (
    <div className='flex flex-col justify-center gap-10 align-middle h-full'>
        <img src='src/assets/icon.svg' className='w-16 h-16 self-center'/>
        <h1 className='text-4xl text-stone-900 tracking-wide'>
            <span className='px-2 py-2 hover:bg-blue-600 hover:rounded-md hover:text-white'>Please Sign In</span></h1>
    </div>
  )
}
