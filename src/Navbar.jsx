import { Link } from "react-router";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/hello">Hello</Link>
      <Link to="/people">People</Link>
      <Link to="/testRTF">TestRTF</Link>
      <Link to="/drei">Drei</Link>
      <Link to="/environments">Environments</Link>
    </nav>
  );
}

export default Navbar;