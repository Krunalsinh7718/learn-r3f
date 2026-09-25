import { useEffect, useState } from "react";
import { Link } from "react-router";
import { StaticElement } from "three/examples/jsm/transpiler/AST.js";
import { div } from "three/tsl";

function Navbar() {

  const [menuActive, setMenuActive] = useState(false);

  return (
    <div className={`navbar-container ${menuActive === true? 'menu-active' : '' }`}>
      <button className="nav-btn" onClick={() => setMenuActive(state => !state)}>
        |||
      </button>
      <nav className="navbar">
        <ul>
        <li> <Link to="/hello">Hello</Link></li>
        <li> <Link to="/people">People</Link></li>
        <li> <Link to="/testRTF">TestRTF</Link></li>
        <li> <Link to="/drei">Drei</Link></li>
        <li> <Link to="/environments">Environments</Link></li>
        <li> <Link to="/models">Models</Link></li>
        <li> <Link to="/text3d">Text 3D</Link></li>
        <li> <Link to="/portal">Portal</Link></li>
        <li> <Link to="/events">Events</Link></li>
        <li> <Link to="/post-processing">Post Processing</Link></li>
        <li> <Link to="/portfolio">Portfolio</Link></li>
        <li> <Link to="/physics">Physics</Link></li>
        <li> <Link to="/game">Game</Link></li>
        <li> <Link to="/loaders">Loaders</Link></li>
        <li> <Link to="/cameras">Camera</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;