import { useEffect, useState } from "react";
import UserList from "./UserList";
import {
  BASE_URL,
  RECEIVED_CONNECTIONS_URL,
  REQUEST_RECEIVE_URL,
} from "../utils/constant";
import axios from "axios";
import Toast from "../components/Toast";
import { useDispatch, useSelector } from "react-redux";
import { addRequestUser, removeRequestUser } from "../utils/requestSlice";

const Requests = () => {
  const [feedStatus, setFeedStatus] = useState("");
  const [feedStatusMsg, setFeedStatusMsg] = useState("");
  const requestSelector = useSelector((state) => state.request);
  const dispatch = useDispatch();

  const handleToast = (status, message) => {
    setFeedStatus(status);
    setFeedStatusMsg(message);
    setTimeout(() => {
      setFeedStatus("");
      setFeedStatusMsg("");
    }, 3000);
  };

  const handleRequest = async (status, connectionid) => {
    try {
      const response = await axios.get(
        BASE_URL + REQUEST_RECEIVE_URL + status + "/" + connectionid,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        handleToast("success", response?.data?.message);
        dispatch(removeRequestUser(connectionid));
      }
    } catch (error) {
      handleToast("error", error.response?.data?.message || error?.message);
    }
  };

  const fetchRequestReceivedList = async () => {
    try {
      const response = await axios.get(BASE_URL + RECEIVED_CONNECTIONS_URL, {
        withCredentials: true,
      });
      dispatch(addRequestUser(response?.data?.data));
    } catch (error) {
      handleToast("error", error.response?.data?.message || error?.message);
    }
  };

  useEffect(() => {
    fetchRequestReceivedList();
  }, []);

  if (!requestSelector || requestSelector?.length === 0)
    return (
      <div className="flex justify-center content-center pt-20">
        No request available
      </div>
    );

  return (
    <>
      {feedStatus && <Toast status={feedStatus} message={feedStatusMsg} />}
      <h1 className="text-center text-pink-500 text-2xl pt-5">
        Request Received :
      </h1>
      {requestSelector &&
        requestSelector?.map((data, index) => (
          <UserList
            user={data?.fromUserId}
            key={index}
            type="requests"
            handleRequest={(status, connectionid) =>
              handleRequest(status, connectionid)
            }
          />
        ))}
    </>
  );
};

export default Requests;
