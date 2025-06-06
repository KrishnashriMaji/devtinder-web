import { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import { BASE_URL, FEED_URL, REQUEST_SEND_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeedUser, removeFeedUser } from "../utils/feedSlice";
import Toast from "../components/Toast";

const Feed = () => {
  const feedSelector = useSelector((state) => state.feed);
  const dispatch = useDispatch();
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

  const fetchFeedData = async () => {
    try {
      const response = await axios.get(BASE_URL + FEED_URL, {
        withCredentials: true,
      });
      dispatch(addFeedUser(response?.data?.data));
    } catch (error) {
      handleToast("error", error.response?.data?.message || error?.message);
    }
  };

  const handleFeedRequest = async (status, userId) => {
    try {
      const response = await axios.get(
        BASE_URL + REQUEST_SEND_URL + status + "/" + userId,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        handleToast("success", response?.data?.message);
        dispatch(removeFeedUser(userId));
      }
    } catch (error) {
      handleToast("error", error.response?.data?.message || error?.message);
    }
  };

  useEffect(() => {
    fetchFeedData();
  }, []);

  useEffect(() => {
    if (feedSelector?.length === 1) {
      fetchFeedData();
    }
  }, [feedSelector]);

  if (!feedSelector || feedSelector?.length === 0)
    return (
      <div className="flex justify-center content-center pt-20">
        No user available
      </div>
    );

  return (
    <>
      {feedStatus && <Toast status={feedStatus} message={feedStatusMsg} />}

      {feedSelector?.map((data, index) => {
        if (index == 0)
          return (
            <Card
              user={data}
              key={index}
              handleFeedRequest={(status, userId) =>
                handleFeedRequest(status, userId)
              }
            />
          );
      })}
    </>
  );
};

export default Feed;
