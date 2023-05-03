import React, { useEffect, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { List } from "../App";

interface IProps {
  propsLists: List[];
}

const NewTask = (props: IProps) => {
  const [favList, setFavList] = useState<List>({ id: "", title: "" });
  const [starredTask, setStarredTask] = useState<boolean>(false);
  const inputTask = document.getElementById("taskText");

  const setEndOfContenteditable = (contentEditableElement: any) => {
    let range, selection;
    if (document.createRange) {
      //Firefox, Chrome, Opera, Safari, IE 9+
      range = document.createRange(); //Create a range (a range is a like the selection but invisible)
      range.selectNodeContents(contentEditableElement); //Select the entire contents of the element with the range
      range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
      selection = window.getSelection(); //get the selection object (allows you to change selection)
      selection.removeAllRanges(); //remove any selections already made
      selection.addRange(range); //make the range you have just created the visible selection
    } else if (document.selection) {
      //IE 8 and lower
      range = document.body.createTextRange(); //Create a range (a range is a like the selection but invisible)
      range.moveToElementText(contentEditableElement); //Select the entire contents of the element with the range
      range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
      range.select(); //Select the range (make it the visible selection
    }
  };

  const handleInputTask = (taskText: string) => {
    if (taskText.includes("!!!")) {
      let trigger = taskText;
      inputTask!.innerHTML = trigger.replace(
        /!!!/,
        "<span class='bg-blue-600 rounded-md px-2 py-1 text-white'>!!!</span>"
      );
      setStarredTask(true);
    } else {
      setStarredTask(false);
    }
    setEndOfContenteditable(inputTask);
  };

  useEffect(() => {
    if (props.propsLists.length == 0) return;

    setFavList(props.propsLists[0]);
  }, [props.propsLists]);

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row justify-between px-10">
        <div
          id="taskText"
          contentEditable={true}
          className="w-3/5 py-4 border-0 text-left border-b-2 text-stone-900 text-3xl placeholder:text-3xl placeholder:text-stone-500 placeholder:tracking-wide focus:outline-0 focus:border-b-2 focus:border-b-blue-600"
          // placeholder="Add task"
          onInput={(e) => handleInputTask(e.target.innerText)}
        ></div>
        <div className="flex flex-row justify-between gap-10">
          {!starredTask ? (
            <FaRegStar
              id="emptyStar"
              className="self-center text-3xl text-stone-500"
              onClick={() => setStarredTask(true)}
            />
          ) : (
            <FaStar
              id="fillStar"
              className="self-center text-3xl text-yellow-500"
              onClick={() => setStarredTask(false)}
            />
          )}
          <button
            className="bg-blue-600 hover:bg-blue-700 my-4 px-6 rounded-md text-white font-semibold tracking-wide"
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
              {favList.title}
              <FaAngleDown className="self-center" />
            </button>
          </div>
          <div
            className="absolute left-0 z-10 -mt-14 w-56 bg-white drop-shadow-xl shadow-black"
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
