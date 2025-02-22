import { useEffect } from "react";
import Drag from "./Drag";
import Login from "./Login";
import Register from "./Register";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

function App() {
  const a = localStorage.getItem("id");
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const token = localStorage.getItem("id");
    if (!token) {
      if (location.pathname === "/cabinet") {
        navigate("/login");
        navigate("/");
      }
    }
  }, [navigate, location.pathname]);

  return (
    <div>
      <div className="text-white d-flex justify-content-between p-3 bg-dark align-items-center">
        <Link
          style={{
            textDecoration: "none",
            fontSize: "38px",
            fontFamily: "monospace",
          }}
          className="text-white"
          to={`/cabinet/${a}`}
        >
          Logo
        </Link>
        <div className="d-flex gap-2 align-item-center justify-content-center">
          <Link to={"/"} className="btn btn-primary btn-sm m-2">
            Login
          </Link>
          <Link to={"/cabinet"} className="btn btn-warning btn-sm m-2">
            Cabinet
          </Link>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cabinet/:id" element={<Drag />} />
      </Routes>
    </div>
  );
}

export default App;
