import { Link, Outlet } from "react-router-dom";
import React, {useState, useEffect} from "react";
import axios from "axios";
import Constants from "../utils/const.js";

export default function Dashboard() {

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
