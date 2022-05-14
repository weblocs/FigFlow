import { Link, Outlet } from "react-router-dom";
import React, {useState, useEffect} from "react";
import axios from "axios";
import Constants from "../utils/const.js";
import * as Realm from "realm-web";



export default function Dashboard() {





// Mongo DB Realm

  const app = new Realm.App({ id: "application-0-icorv" });
  const [user, setUser] = React.useState(app.currentUser);
  // Create a component that displays the given user's details
  function UserDetail({ user }) {
    console.log("Successfully logged in!", user);
    return (
      <div>
        <h1>Logged in: {user._profile.data.email}</h1>
        <LogOut />
      </div>
    );
  }

  // Create a component that lets an anonymous user log in
  function Login({ setUser }) {
    const loginAnonymous = async () => {
      // const user = await app.logIn(Realm.Credentials.anonymous());
      const user = await loginEmailPassword("kocielam@gmail.com", "Maciek123");
      console.log("Successfully logged in!", user);
      setUser(user);
    };
    return <button onClick={loginAnonymous}>Log In</button>;
  }

  function LogOut({ setUser }) {
    const logOutUser = async () => {
      await app.currentUser.logOut();
      setUser(user);
    };
    return <button onClick={logOutUser}>Log Out</button>;
  }

  async function loginEmailPassword(email, password) {
    // Create an anonymous credential
    const credentials = Realm.Credentials.emailPassword(email, password);
    try {
      // Authenticate the user
      const user = await app.logIn(credentials);
      // `App.currentUser` updates to match the logged in user
      console.assert(user.id === app.currentUser.id);
      return user;
    } catch (err) {
      console.error("Failed to log in", err);
    }
  }

  const [projects, setProjects] = useState([]);

    useEffect(() => {
    axios
        .get(
          Constants.BASE_API + "projects"
        )
        .then((res) => {
          setProjects(res.data);
        });
    }, []);


  return (
    <main style={{ padding: "1rem 0" }}>


      <div className="App-header">
        {user ? <UserDetail user={user} /> : <Login setUser={setUser} />}
      </div>


      <h2>Projects</h2>

      {projects?.map((project) => (
          <Link
            style={{ display: "block", margin: "1rem 0" }}
            to={`/design/${project.project}`}
            key={project.project}
          >
            {project.project}
          </Link>
        ))}
        <Outlet />

    </main>
  );
}
