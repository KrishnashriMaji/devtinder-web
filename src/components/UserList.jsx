const UserList = ({ user, type, handleRequest }) => {
  return (
    <div className="max-w-2/3 mx-auto my-5">
      <ul className="list bg-base-100 rounded-box shadow-md ">
        <li className="list-row">
          <div>
            <img
              className="size-20 rounded-box"
              src="https://img.daisyui.com/images/profile/demo/1@94.webp"
            />
          </div>
          <div className="flex justify-between flex-col">
            <div>
              {user?.firstName} {user?.lastName}{" "}
              <div className="text-xs uppercase font-semibold opacity-60">
                {user?.age} years old
              </div>
            </div>
            <div>
              {user?.skill?.toString()}
              <p className="list-col-wrap text-xs">{user?.about}</p>
            </div>
          </div>

          {type === "requests" && (
            <>
              {" "}
              <button
                className="btn btn-square btn-ghost hover:bg-red-100"
                onClick={() => handleRequest("rejected", user?._id)}
              >
                ❌
              </button>
              <button
                className="btn btn-square btn-ghost hover:bg-green-100"
                onClick={() => handleRequest("accepted", user?._id)}
              >
                <svg
                  className="size-[1.2em]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </g>
                </svg>
              </button>
            </>
          )}
        </li>
      </ul>
    </div>
  );
};

export default UserList;
