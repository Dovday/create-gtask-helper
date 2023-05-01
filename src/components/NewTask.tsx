import React, { useEffect, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";

const NewTask = (props) => {
  const addFav = () => {
    document.getElementById("emptyStar").classList.add("hidden")!;
    document.getElementById("fillStar").classList.remove("hidden")!;
  };
  const delFav = () => {
    document.getElementById("fillStar").classList.add("hidden")!;
    document.getElementById("emptyStar").classList.remove("hidden")!;
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row justify-between px-10">
        <input
          className="w-3/5 py-4 border-0 border-b-2 text-stone-900 text-4xl placeholder:text-4xl placeholder:text-stone-500 placeholder:tracking-wide focus:outline-0 focus:border-b-4 focus:border-b-blue-600"
          type="text"
          placeholder="Add task"
        />
        <div className="flex flex-row justify-between gap-10">
          <FaRegStar
            id="emptyStar"
            className="self-center text-5xl text-stone-500"
            onClick={() => addFav()}
          />
          <FaStar
            id="fillStar"
            className="hidden self-center text-5xl text-yellow-500"
            onClick={() => delFav()}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 my-2 px-10 rounded-md text-white text-xl font-semibold tracking-wide"
            type="submit"
          >
            Save
          </button>
        </div>
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
              <FaAngleDown className="self-center" />
            </button>
          </div>
          <div
            className="absolute left-0 z-10 mt-2 w-56 bg-white drop-shadow-xl shadow-black"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <div className="py-1" role="none">
              {props.propsLists.map((list) => {
                return (
                  <a
                    href="#"
                    className="block text-stone-900 text-xl px-5 py-2 hover:bg-stone-100"
                    id={`menu-item-${list.id}`}
                    key={list.id}
                  >
                    {list.title}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTask;
