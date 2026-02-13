// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import PollList from "./pages/PollList";
// import CreatePoll from "./pages/CreatePoll";
// import PollDetails from "./pages/PollDetails";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<PollList />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/create" element={<CreatePoll />} />
//         <Route path="/poll/:id" element={<PollDetail />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PollList from "./pages/PollList";
import CreatePoll from "./pages/CreatePoll";
import PollDetails from "./pages/PollDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PollList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create" element={<CreatePoll />} />
        <Route path="/poll/:id" element={<PollDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

