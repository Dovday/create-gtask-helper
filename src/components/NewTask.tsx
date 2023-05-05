import React, { useEffect, useState } from "react";
import { FaRegStar, FaStar, FaAngleDown, FaAngleUp } from "react-icons/fa";
import { List } from "../App";
import Dropdown from "react-dropdown";
import * as api from "../api/google";
import InputDate from "./DatePicker";

interface IProps {
  propsLists: List[];
}

interface IListOption {
  value: string;
  label: string;
}

// EXAMPLE TASK FROM DOC
// {
//   "kind": string,
//   "id": string,
//   "etag": string,
//   "title": string,
//   "updated": string,
//   "selfLink": string,
//   "parent": string,
//   "position": string,
//   "notes": string,
//   "status": string,
//   "due": string,
//   "completed": string,
//   "deleted": boolean,
//   "hidden": boolean,
//   "links": [
//     {
//       "type": string,
//       "description": string,
//       "link": string
//     }
//   ]
// }

export interface ITask {
  kind?: string; // must always be 'task#task',
  title: string;
  updated?: string; // RFC 3339 timestamp
  notes?: string; // optional: description
  status: string; // 'needsAction' or 'completed'
  due?: string; // optional: RFC 3339 timestamp - It isn't possible to read or write the time that a task is due via the API
}

const NewTask = (props: IProps) => {
  const [favList, setFavList] = useState<List>({ id: "", title: "" });
  const [starredTask, setStarredTask] = useState<boolean>(false);
  const [task, setTask] = useState<ITask>();

  const inputTask = document.getElementById("taskText");
  const taskPlaceholder = document.getElementById("taskPlaceholder");

  const [listsOption, setListsOption] = useState<IListOption[]>([]);

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
    // TODO
    // handle placeholder

    let trigger = taskText;
    if (taskText.includes("!!!")) {
      inputTask!.innerHTML = trigger.replace(
        /!!!/,
        "<span class='bg-blue-600 rounded-md px-2 py-1 text-white'>!!!</span>"
      );
      setStarredTask(true);
    } else {
      inputTask!.innerHTML = trigger.replace(
        "<span class='bg-blue-600 rounded-md px-2 py-1 text-white'></span>",
        ""
      );
      setStarredTask(false);
    }
    setEndOfContenteditable(inputTask);
  };

  const handleListClick = (chosenList: any) => {
    const convertedList = {
      id: chosenList.value,
      title: chosenList.label,
    }
    setFavList(convertedList);
  };

  const postTask = () => {
    if (!inputTask!.innerText) {
      console.log("empty task");
      // TODO
      // show alert

      inputTask!.focus();
      return;
    }

    const newTask: ITask = {
      title: inputTask!.innerText,
      due: "2023-05-05T16:59:19.243Z",
      notes: "test",
      status: "needsAction",
    };

    const status = api.postTask(newTask, favList);
    // TODO
    // check if status is 200
    inputTask!.innerHTML = "";
    inputTask!.focus();

    console.log(status);
  };

  useEffect(() => {
    if (props.propsLists.length == 0) return;

    setListsOption(props.propsLists.map((list) => {
      return {
        value: list.id,
        label: list.title,
      }
    }));
    setFavList(props.propsLists[0]);

    // console.log(api.getAllTasksFromList(props.propsLists[0]));
  }, [props.propsLists]);

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row justify-between px-10">
        <div
          id="taskText"
          contentEditable={true}
          className="w-3/5 py-4 border-0 text-left border-b-2 text-stone-900 text-3xl focus:outline-0 focus:border-b-2 focus:border-b-blue-600"
          // placeholder="Add task"
          onInput={(e) => handleInputTask(e.target.innerText)}
          //onClick={() => taskPlaceholder!.classList.add("text-white")}
        >
          {/* <span
            id="taskPlaceholder"
            className="text-3xl text-stone-500 tracking-wide pointer-events-none"
          >
            Add task
          </span> */}
        </div>
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
            onClick={() => postTask()}
          >
            Save
          </button>
        </div>
      </div>
      <div className="flex px-10 gap-x-10">
        <Dropdown
          className="relative inline-block text-left text-stone-900 tracking-wide rounded-md bg-stone-100 px-3 py-3"
          controlClassName="flex flex-row justify-between gap-x-1.5 items-center"
          menuClassName="absolute left-0 top-0 z-10 w-52 bg-white drop-shadow-xl shadow-black"
          options={listsOption}
          onChange={(list) => {handleListClick(list)}}
          value={favList.id}
          placeholder={favList.title}
          arrowClosed={<FaAngleDown className="self-center"/>}
          arrowOpen={<FaAngleUp className="" />}
        />
        <InputDate/>
      </div>
    </div>
  );
};

export default NewTask;
