import { BrowserRouter, Routes, Route } from "react-router";
import Hello from "./pages/hello/Hello.jsx";
import People from "./pages/people/People.jsx";
import Navbar from "./Navbar.jsx";
import TestRTF from "./pages/rtf/TestRTF.jsx";
import Drei from "./pages/drei/Drei.jsx";
import Environments from "./pages/environments/Environments.jsx";
import Models from "./pages/model-import/Models.jsx";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/hello" element={<Hello />} />
        <Route path="/people" element={<People />} />
        <Route path="/testRTF" element={<TestRTF />} />
        <Route path="/drei" element={<Drei/>} />
        <Route path="/environments" element={<Environments/>} />
        <Route path="/models" element={<Models />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;