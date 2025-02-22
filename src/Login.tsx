import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { apicall } from "./utils/apiCall";
import { useNavigate } from "react-router-dom";
interface User {
  name: string;
  id: string;
  email: string;
  password: string;
}

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    apicall("/user", "GET", "").then((res) => {
      setUser(res.data);
    });
  }, []);

  function getUser() {
    const foundUser = user.find(
      (itm) => itm.email === email && itm.password === password
    );

    if (foundUser) {
      localStorage.setItem("id", `${foundUser.id}`);
      navigate(`/cabinet/${foundUser.id}`);
    } else {
      alert("User Not Found");
    }
  }
  return (
    <div className="d-flex justify-content-center align-items-center m-5 bg-light">
      <div className="card shadow-sm p-4" style={{ width: "350px" }}>
        <h4 className="text-center mb-3">Login</h4>
        <div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button onClick={getUser} className="btn btn-dark w-100">
            Sign up
          </button>
        </div>
        <div className="d-flex justify-content-center align-items-center flex-column m-1">
          <p>If you don't have an account go here.</p>
          <Link
            style={{
              textDecoration: "none",
            }}
            className="mt-2"
            to={"/register"}
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
