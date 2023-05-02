import axios from "axios";

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
