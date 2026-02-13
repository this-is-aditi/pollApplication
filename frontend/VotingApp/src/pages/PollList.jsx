import { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

export default function PollList(){
  const [polls,setPolls]=useState([]);

  useEffect(()=>{
    API.get("/candidate")   // adjust to your route
      .then(res=>setPolls(res.data));
  },[]);

  return (
    <div>
      <h2>Polls</h2>

      {polls.map(p=>(
        <div key={p._id}>
          <Link to={`/poll/${p._id}`}>
            {p.title}
          </Link>
        </div>
      ))}
    </div>
  );
}
