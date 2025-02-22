import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { apicall } from "./utils/apiCall";
import { useNavigate } from "react-router-dom";

interface User {
  email: string;
  name: string;
  password: string;
}
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState<User[]>([]);
  const navigate = useNavigate();
  const handleSubmit = () => {
    const obj = {
      name,
      email,
      password,
    };
    user.push(obj);
    setUser([...user, obj]);
    apicall("/user", "POST", obj).then((res) => {
      console.log(res.data);
    });
    navigate("/");
  };

  return (
    <div className="d-flex justify-content-center align-items-center m-5 bg-light">
      <div className="card shadow-sm p-4" style={{ width: "350px" }}>
        <h4 className="text-center mb-3">Register</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <button type="submit" className="btn btn-dark w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
