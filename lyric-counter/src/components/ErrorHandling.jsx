import React from "react";

const ErrorHandling = ({ status, msg }) => {
  return (
    <div>
      <h2>
        Error {status}!<br />
        {msg}
      </h2>
    </div>
  );
};

export default ErrorHandling;
