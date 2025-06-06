import { useSelector } from "react-redux";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import axios from "axios";
import { BASE_URL, LOGOUT_URL } from "../utils/constant";

const Navbar = () => {
  const userSelector = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.get(BASE_URL + LOGOUT_URL, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-5">
      <div className="flex-1">
        <Link
          className="btn btn-ghost text-xl"
          to={userSelector ? "/feed" : "/"}
        >
          😍 Dev Tinder
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          {userSelector ? (
            <li>
              <details>
                <summary>
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-8 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      />
                    </div>
                  </div>

                  {userSelector?.firstName}
                  <div
                    aria-label="success"
                    className="status status-success"
                  ></div>
                </summary>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-40 p-2 shadow"
                >
                  <li>
                    <Link className="justify-between" to={"/profile"}>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="justify-between" to={"/connections"}>
                      Connections
                    </Link>
                  </li>
                  <li>
                    <Link className="justify-between" to={"/requests"}>
                      Requests
                    </Link>
                  </li>
                  <li onClick={() => logout()}>
                    <a>Logout</a>
                  </li>
                </ul>
              </details>
            </li>
          ) : (
            <>
              <li>
                <Link className="p-3.5" to="/login">
                  Log In
                </Link>
              </li>
              <li>
                <Link className="p-3.5" to="/signup">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
