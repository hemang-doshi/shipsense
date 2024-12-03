import React from "react";

const NotAuthorized = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-700 text-center mb-6">
        401 Unauthorized
        <br />
        <span className="text-gray-600 text-lg font-semibold text-center">
          You do not have permission to access this page.
        </span>
      </h1>
    </div>
  );
};

export default NotAuthorized;
