import { useSelector } from "react-redux";
import Signup from "./Signup";

const Profile = () => {
  const userSelect = useSelector((state) => state.user);
  return <>{userSelect && <Signup user={userSelect} />}</>;
};

export default Profile;
