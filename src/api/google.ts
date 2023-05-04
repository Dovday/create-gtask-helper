import axios from "axios";
import { ITask, IList } from "../types";

const client = () => {
  return axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  });
};

export const getAllLists = async (): Promise<any[]> => {
  let lists: any[] = [];
  await client()
    .get("/tasks/v1/users/@me/lists")
    .then((response: any) => {
      lists = response.data.items;
    });
  return lists;
};

export const getAllTasksFromList = async (list: IList): Promise<any[]> => {
  let tasks: any[] = [];
  await client()
    .get("/tasks/v1/lists/" + list.id + "/tasks")
    .then((response: any) => {
      tasks = response.data.items;
    });
  return tasks;
};

export const postTask = async (task: ITask, list: IList): Promise<any> => {
  let result: any = {};
  await client()
    .post("/tasks/v1/lists/" + list.id + "/tasks", task)
    .then((response: any) => {
      result = response;
    });
  return result;
};
