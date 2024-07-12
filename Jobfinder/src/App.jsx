// Introduction and example code for jsx

// const App = () => {
//   const name = "John";
//   const x = 10;
//   const y = 20;
//   const names = ["Brad", "Mary", "Joe"];
//   const loggedIn = false;
//   const styles = {color: "red", fontSize: "24px"}

//   return (
//     <div>
//     <div classNameName='text-5xl' >App</div>
{
  /* both is possible */
}
{
  /* <p style={{color: "red", fontSize: "24px"}}>Hello {name}</p> */
}
//     <p style={styles}>Hello {name}</p>
//     <p>The sum of {x} and {y} ist {x + y}</p>
//     <ul>
//       {names.map((name, index) => (
//         <li key={index}>{name}</li>
//       )) }

//     </ul>
//     {loggedIn ? <h1>Hello Member</h1> : <h1>Hello Guest</h1>}

//     </div>
//   );
// };

// export default App

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage  from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";

const App = () => {
  //  Add new Job
  const addJob = async (newJob) => {
    const res = await fetch("/api/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newJob),
    })
return;
  };

  // Delete Job

  const deleteJob = async(id) => {
      const res = await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
      })
  return;
  }

  //  Update Job does not work yet

  const updateJob = async(job) => {
    const res = await fetch(`/api/jobs/${job.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(job),
      })
  return;
  }
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage/>} />
        <Route path="/add-job" element={<AddJobPage addJobsSubmit={addJob}/>} />
        <Route path="/edit-job/:id" element={<EditJobPage updatedJobSubmit={updateJob}/>}
        />
        <Route path="/jobs/:id" element={<JobPage deleteJob={deleteJob}/>}/>
        <Route path="*" element={<NotFoundPage/>} />
  
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
