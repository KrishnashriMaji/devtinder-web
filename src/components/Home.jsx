import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router";
import { useEffect } from "react";
import { BASE_URL, PROFILE_URL } from "../utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useLocation, useNavigate } from "react-router";

const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const userSelector = useSelector((state) => state.user);

  const fetchUserData = async () => {
    if (userSelector) return;
    try {
      const response = await axios.get(BASE_URL + PROFILE_URL, {
        withCredentials: true,
      });

      dispatch(addUser(response?.data?.data));
      if (location?.pathname === "/login" || location?.pathname === "/signup")
        navigate("/feed");
    } catch (error) {
      if (!userSelector) {
        if (location?.pathname === "/login") {
          navigate("login");
        }
        if (location?.pathname === "/signup") {
          navigate("signup");
        } else {
          navigate("/");
        }
      }
      console.log(error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-[81vh] ">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Home;
