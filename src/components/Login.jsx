import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, LOGIN_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("rohit@gmail.com");
  const [password, setPassword] = useState("Rohit@123");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userSelector = useSelector((state) => state.user);

  const submitLoginForm = async () => {
    try {
      const response = await axios.post(
        BASE_URL + LOGIN_URL,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      errorMessage && setErrorMessage("");
      dispatch(addUser(response?.data?.data));
      navigate("/feed");
    } catch (error) {
      setErrorMessage(error.response?.data?.message);
    }
  };

  useEffect(() => {
    () => {
      if (userSelector) {
        navigate("/feed");
      }
    };
  }, []);

  return (
    <div className="flex items-center justify-center pt-10">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>
        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="text-red-500">{errorMessage}</div>
        <button
          className="btn btn-neutral mt-4"
          onClick={() => submitLoginForm()}
        >
          Login
        </button>
        <div className="pt-2 text-center hover:underline">
          New User - <Link to={"/signup"}>Signup</Link>
        </div>
      </fieldset>
    </div>
  );
};

export default Login;
