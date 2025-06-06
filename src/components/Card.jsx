const Card = ({ user, handleFeedRequest }) => {
  return (
    <div className="flex justify-center content-center pt-20">
      <div className="card card-side bg-base-100 shadow-lg">
        <figure className="max-w-90 max-h-70">
          {user?.gender === "Male" ? (
            <img
              src="https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561_1280.png"
              alt="Male"
            />
          ) : (
            <img
              src="https://cdn.pixabay.com/photo/2015/10/18/20/15/woman-995164_1280.png"
              alt="Female"
            />
          )}
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {user?.firstName} {user?.lastName}
          </h2>
          <p>
            Age : {user?.age} <br />
            Skill : {user?.skill?.toString()}
            <br />
            About : {user?.about}
          </p>

          <div className="card-actions justify-end">
            <button
              className="btn btn-secondary"
              onClick={() => handleFeedRequest("ignored", user?._id)}
            >
              Ignored
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleFeedRequest("interested", user?._id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
