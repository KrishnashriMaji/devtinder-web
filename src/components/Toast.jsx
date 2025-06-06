const Toast = ({ status, message }) => {
  return (
    <>
      {status == "success" && (
        <div className="toast toast-top toast-end min-w-50">
          <div className="alert alert-success">
            <span>{message}</span>
          </div>
        </div>
      )}
      {status == "error" && (
        <div className="toast toast-top toast-end min-w-50">
          <div className="alert alert-error">
            <span>{message}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Toast;
