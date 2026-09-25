import { BrowserRouter, Routes, Route } from "react-router";
import Hello from "./pages/hello/Hello.jsx";
import People from "./pages/people/People.jsx";
import Navbar from "./Navbar.jsx";
import TestRTF from "./pages/rtf/TestRTF.jsx";
import Drei from "./pages/drei/Drei.jsx";
import Environments from "./pages/environments/Environments.jsx";
import Models from "./pages/model-import/Models.jsx";
import Text3DLearn from "./pages/text3d/Text3DLearn.jsx";
import PortalMain from "./pages/portal/PortalMain.jsx";
import EventsMain from "./pages/events/EventsMain.jsx";
import PostProcessingMain from "./pages/post-processing/PostProcessingMain.jsx";
import PortfolioMain from "./pages/portfolio/PortfolioMain.jsx";
import PhysicsMain from "./pages/physics/PhysicsMain.jsx";
import GameMain from "./pages/game/GameMain.jsx";
import LoadersMain from "./pages/loaders/LoadersMain.jsx";
import CameraMain from "./pages/camera/CameraMain.jsx";


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
        <Route path="/text3d" element={<Text3DLearn />} />
        <Route path="/portal" element={<PortalMain />} />
        <Route path="/events" element={<EventsMain />} />
        <Route path="/post-processing" element={<PostProcessingMain />} />
        <Route path="/portfolio" element={<PortfolioMain />} />
        <Route path="/physics" element={<PhysicsMain />} />
        <Route path="/game" element={<GameMain />} />
        <Route path="/loaders" element={<LoadersMain />} />
        <Route path="/cameras" element={<CameraMain />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;