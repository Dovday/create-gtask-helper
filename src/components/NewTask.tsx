import React from "react";
import { FaRegStar } from 'react-icons/fa';


const NewTask = () => {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row justify-between px-10">
        <input
          className="w-3/5 py-4 border-0 border-b-2 text-stone-900 text-4xl placeholder:text-4xl placeholder:text-stone-500 placeholder:tracking-wide focus:outline-0 focus:border-b-4 focus:border-b-blue-600"
          type="text"
          placeholder="Add task"
        />
        <FaRegStar className="self-center text-5xl -mr-16 text-stone-500"/>
        <button
          className="bg-blue-600 hover:bg-blue-700 my-2 px-10 rounded-md text-white text-xl font-semibold tracking-wide"
          type="submit"
        >
          Save
        </button>
      </div>
      <div className="flex px-10">
        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              className="inline-flex w-full align-middle text-xl  text-stone-900 tracking-wide justify-center gap-x-1.5 rounded-md bg-stone-100 px-3 py-3"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
            >
              Lists
              <svg
                className="-mr-1 h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div
            className="absolute left-0 z-10 mt-2 w-56 bg-white drop-shadow-xl shadow-black"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <div className="py-1" role="none">
              <a
                href="#"
                className="block text-stone-900 text-xl px-4 py-2 hover:bg-stone-100"
                id="menu-item-0"
              >
                l1
              </a>
              <a
                href="#"
                className="block text-stone-900 text-xl px-4 py-2 hover:bg-stone-100"
                id="menu-item-1"
              >
                l1
              </a>
              <a
                href="#"
                className="block text-stone-900 text-xl px-4 py-2 hover:bg-stone-100"
                id="menu-item-2"
              >
                l1
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTask;
