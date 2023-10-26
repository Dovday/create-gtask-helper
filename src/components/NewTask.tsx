import React, { useEffect, useState } from "react";
import { FaRegStar, FaStar, FaAngleDown, FaAngleUp } from "react-icons/fa";
import { IList } from "../App";
import Dropdown from "react-dropdown";
import * as api from "../api/google";
import InputDate from "./DatePicker";
import { format } from "fecha";
import Alert from "./Alert";
import ListsPrompt from "./ListsPrompt";

interface IProps {
  propsLists: IList[];
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
  const [favList, setFavList] = useState<IList>({ id: "", title: "" });
  const [starredTask, setStarredTask] = useState<boolean>(false);
  // const [task, setTask] = useState<ITask>();
  const [dueDate, setDueDate] = useState<string>("");
  const [descriptionText, setDescriptionText] = useState<string>("");

  const inputTask = document.getElementById("taskText");
  const inputNotes = document.getElementById("descriptionText");
  const [saveBtnDisabled, setSaveBtnDisabled] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [taskAddedSucc, setTaskAddedSucc] = useState<boolean>(false);
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
    // removing alerts
    setError(false);
    setTaskAddedSucc(false);

    inputTask!.innerText.length > 0
      ? setSaveBtnDisabled(false)
      : setSaveBtnDisabled(true);

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
    };
    setFavList(convertedList);
  };

  const postTask = async () => {
    const newTask: ITask = {
      title: inputTask!.innerText,
      due: dueDate, // increment by 1 if you want to get correct date (from selected)
      notes: descriptionText,
      status: "needsAction",
    };

    const status = (await api.postTask(newTask, favList)).status;

    console.log(status);

    if (status == 200) {
      setTaskAddedSucc(true);
      inputTask!.innerHTML = "";
      inputTask!.focus();
      inputNotes!.innerText = "";
      setStarredTask(false);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    if (props.propsLists.length == 0) return;

    setListsOption(
      props.propsLists.map((list) => {
        return {
          value: list.id,
          label: list.title,
        };
      })
    );
    setFavList(props.propsLists[0]);

    // console.log(api.getAllTasksFromList(props.propsLists[0]));
  }, [props.propsLists]);

  return (
    <div className="flex flex-col px-10 gap-7">
      <div className="flex flex-row justify-between">
        <div
          id="taskText"
          contentEditable={true}
          className="w-3/5 py-4 border-0 text-left border-b-2 text-stone-900 text-3xl focus:outline-0 focus:border-b-2 focus:border-b-blue-600"
          onInput={(e: any) => handleInputTask(e.target.innerText)}
          data-placeholder="Add task"
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
            id="saveBtn"
            className="hover:disabled:bg-blue-600 disabled:opacity-50 bg-blue-600 hover:bg-blue-700 my-4 px-6 rounded-md text-white font-semibold tracking-wide"
            type="submit"
            disabled={saveBtnDisabled}
            onClick={() => postTask()}
          >
            Save
          </button>
        </div>
      </div>
      {/* set timeout for alerts */}
      {error ? (
        <div className="flex w-full">
          <Alert
            message="An error occured. Please try again."
            type="error"
            showIcon
          />
        </div>
      ) : null}
      {taskAddedSucc ? (
        <div className="flex w-full">
          <Alert message="Task added successfully." type="info" closable />
        </div>
      ) : null}
      <div className="flex gap-x-10">
        <Dropdown
          className="relative inline-block text-left text-stone-900 tracking-wide rounded-md bg-stone-100 px-3 py-3"
          controlClassName="flex flex-row justify-between gap-x-1.5 items-center"
          menuClassName="absolute left-0 top-0 z-10 w-52 bg-white drop-shadow-xl shadow-black"
          options={listsOption}
          onChange={(list) => {
            handleListClick(list);
          }}
          value={favList.id}
          placeholder={favList.title}
          arrowClosed={<FaAngleDown className="arrow-list self-center" />}
          arrowOpen={<FaAngleUp className="arrow-list" />}
        />
        <InputDate
          onChange={(dateString) => {
            setDueDate(format(new Date(dateString), "isoDateTime"));
          }}
        />
      </div>
      <div className="flex gap-x-10">
        <div
          id="descriptionText"
          contentEditable={true}
          className="w-3/5 px-3 py-3 bg-stone-100 border-0 text-left rounded-md text-stone-900 text-sm"
          data-placeholder="Add description"
          onInput={(e: any) => setDescriptionText(e.target.innerText)}
        ></div>
      </div>
    </div>
  );
};

export default NewTask;
