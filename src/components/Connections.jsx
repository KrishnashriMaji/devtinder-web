import { useEffect, useState } from "react";
import UserList from "./UserList";
import { BASE_URL, CONNECTIONS_URL } from "../utils/constant";
import axios from "axios";
import Toast from "../components/Toast";

const Connections = () => {
  const [connectionList, setConnectionList] = useState([]);
  const [feedStatus, setFeedStatus] = useState("");
  const [feedStatusMsg, setFeedStatusMsg] = useState("");

  const handleToast = (status, message) => {
    setFeedStatus(status);
    setFeedStatusMsg(message);
    setTimeout(() => {
      setFeedStatus("");
      setFeedStatusMsg("");
    }, 3000);
  };

  const fetchConnectionData = async () => {
    try {
      const response = await axios.get(BASE_URL + CONNECTIONS_URL, {
        withCredentials: true,
      });
      setConnectionList(response?.data?.data);
    } catch (error) {
      handleToast("error", error.response?.data?.message || error?.message);
    }
  };

  useEffect(() => {
    fetchConnectionData();
  }, []);

  if (!connectionList || connectionList?.length === 0)
    return (
      <div className="flex justify-center content-center pt-20">
        No user available
      </div>
    );

  return (
    <>
      {feedStatus && <Toast status={feedStatus} message={feedStatusMsg} />}
      <h1 className="text-center text-pink-500 text-2xl pt-5">
        My Connections :
      </h1>
      {connectionList &&
        connectionList?.map((data, index) => (
          <UserList user={data} key={index} type="connections" />
        ))}
    </>
  );
};

export default Connections;
