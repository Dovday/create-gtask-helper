// to kill process that is using port 5173
// lsof -i :5173
// kill -9 <PID>

import React, { useEffect, useState } from "react";
import "./App.css";
import * as api from "./api/google";
import NewTask from "./components/NewTask";
import { LoadingScreen } from "./components/LoadingScreen";
import { NavBar} from "./components/Navbar";

export interface IList {
  id: string;
  title: string;
}

const App = () => {
  const [lists, setLists] = useState<IList[]>([]);

  // gapi api call
  const client = google.accounts.oauth2.initTokenClient({
    client_id: import.meta.env.VITE_CLIENT_ID,
    scope: import.meta.env.VITE_SCOPES,
    callback: async (response) => {
      localStorage.setItem("access_token", response.access_token);
      api.getAllLists()
      .then((response) => setLists(response));
    },
  });

  useEffect(() => {
    client.requestAccessToken();

    console.log("client", client);
  }, []);

  return (
    <div className="App flex flex-col h-screen py-4">
      {lists.length > 0 ?
      <>
        <NewTask propsLists={lists}/>
        <NavBar/>
      </>
       : <LoadingScreen/>}
    </div>
  );
}

export default App;
