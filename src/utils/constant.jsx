export const BASE_URL =
  location.hostname === "localhost" ? "http://localhost:3000/" : "/api/";
export const LOGIN_URL = "user/login";
export const SIGNUP_URL = "user/signup";
export const PROFILE_URL = "profile/view";
export const PROFILE_UPDATE_URL = "profile/edit";
export const LOGOUT_URL = "user/logout";
export const FEED_URL = "user/feed";
export const CONNECTIONS_URL = "user/connections";
export const RECEIVED_CONNECTIONS_URL = "user/requests/received";
export const REQUEST_SEND_URL = "request/send/";
export const REQUEST_RECEIVE_URL = "request/receive/";
