import React, { useState } from 'react'
import { FaPlus, FaList } from "react-icons/fa";

export const NavBar = () => {
  const [activePage, setActivePage] = useState<string>('addTasks');

  const changePageToLists = () => {
    setActivePage('lists');
  }

  const changePageToAddTask = () => {
    setActivePage('addTasks');
  }

  return (
    <div className='flex flex-row justify-around gap-10 items-center w-full h-20 fixed bottom-0 left-0 shadow-2xl'>
      { activePage === 'addTasks' ?
      <button className='flex flex-col items-center'>
        <FaPlus className='text-xl'/>
        Add Task
      </button>
        :
      <button className='flex flex-col items-center text-[#d9d9d9]'
      onClick={changePageToAddTask}>
        <FaPlus className='text-xl'/>
        Add Task
      </button>
      }
      { activePage === 'lists' ?
      <button className='flex flex-col items-center'>
        <FaList className='text-xl'/>
        Lists
      </button>
        :
      <button className='flex flex-col items-center text-[#d9d9d9]'
      onClick={changePageToLists}>
        <FaList className='text-xl'/>
        Lists
      </button>
      }
    </div>
  )
}
