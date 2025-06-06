import { useState, useActionState } from "react";
import { Link, useNavigate } from "react-router";
import { BASE_URL, SIGNUP_URL, PROFILE_UPDATE_URL } from "../utils/constant";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Signup = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState(user?.password || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [age, setAge] = useState(user?.age || 18);
  const [skill, setSkill] = useState(user?.skill?.toString() || "");
  const [about, setAbout] = useState(user?.about || "");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function loginAction(prevState, formData) {
    try {
      if (!user) {
        const response = await axios.post(
          BASE_URL + SIGNUP_URL,
          {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            emailId: formData.get("email"),
            password: formData.get("password"),
            gender: formData.get("gender"),
            age: formData.get("age"),
            skill: formData.get("skill"),
            about: formData.get("about"),
          },
          { withCredentials: true }
        );
        dispatch(addUser(response?.data?.data));
        navigate("/feed");
        return { success: true, message: "Login successful!" };
      } else {
        try {
          const response = await axios.post(
            BASE_URL + PROFILE_UPDATE_URL,
            {
              firstName: formData.get("firstName"),
              lastName: formData.get("lastName"),
              gender: formData.get("gender"),
              age: formData.get("age"),
              skill: formData.get("skill"),
              about: formData.get("about"),
            },
            { withCredentials: true }
          );
          dispatch(addUser(response?.data?.data));
          return { success: true, message: "Update successful!" };
        } catch (error) {
          console.log(error.response?.data?.message);
          return { success: false, message: error.response?.data?.message };
        }
      }
    } catch (error) {
      console.log(error.response?.data?.message);
      return { success: false, message: error.response?.data?.message };
    }
  }

  const [state, formAction, isPending] = useActionState(loginAction, {
    success: null,
    message: "",
  });

  return (
    <div className="flex items-center justify-center pt-10">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <form action={formAction}>
          <legend className="fieldset-legend">
            {user ? "Profile" : "Sign Up"}
          </legend>

          <label className="label">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="input"
            name="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <label className="label">
            Last Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="input"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
          />

          {!user && (
            <>
              <label className="label">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="input"
                placeholder="mail@site.com"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label className="label">
                Password<span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                className="input"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </>
          )}

          <label className="label">Age {age}</label>
          <input
            type="range"
            min={18}
            max="100"
            name="age"
            value={age}
            className="range"
            onChange={(e) => setAge(e.target.value)}
            required
          />

          <label className="label">
            Gender<span className="text-red-500">*</span>
          </label>
          <select
            className="select"
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value={""} disabled={true}>
              Select
            </option>
            <option value={"Male"}>Male</option>
            <option value={"Female"}>Female</option>
            <option value={"Other"}>Other</option>
          </select>

          <label className="label">Skills</label>
          <input
            type="text"
            className="input"
            name="skill"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            placeholder="Cricket,Footbal,Batminton"
          />

          <label className="label">About</label>
          <textarea
            className="textarea h-24"
            placeholder="Bio"
            name="about"
            onChange={(e) => setAbout(e.target.value)}
            value={about}
          ></textarea>

          {state.message && (
            <div style={{ color: state.success ? "green" : "red" }}>
              {state.message}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-neutral mt-4"
            disabled={isPending}
          >
            {isPending
              ? user
                ? "Updating"
                : "Signing Up..."
              : user
              ? "Update"
              : "SignUp..."}
          </button>
        </form>
        {!user && (
          <div className="pt-2 text-center hover:underline">
            <Link to={"/login"}>Existing User - Login</Link>
          </div>
        )}
      </fieldset>
    </div>
  );
};

export default Signup;
