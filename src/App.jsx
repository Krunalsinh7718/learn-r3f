import { BrowserRouter, Routes, Route } from "react-router";
import Hello from "./components/Hello.jsx";
import People from "./components/People.jsx";
import Navbar from "./Navbar.jsx";
import TestRTF from "./components/TestRTF.jsx";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/hello" element={<Hello />} />
        <Route path="/people" element={<People />} />
        <Route path="/people" element={<People />} />
        <Route path="/testRTF" element={<TestRTF />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;