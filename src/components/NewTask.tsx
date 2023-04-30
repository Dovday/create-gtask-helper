import React from 'react'

const NewTask = () => {
  return (
    <div className='flex justify-around'>
      <input className='w-3/5 border-0 border-b-2 placeholder:text-4xl placeholder:text-stone-500 placeholder: tracking-wide' type="text" placeholder="Add task"/>
      <button className='bg-blue-600 hover:bg-blue-700 py-3 px-9 rounded text-white text-xl font-semibold tracking-wide' type="submit">Save</button>
    </div>
  )
}

export default NewTask