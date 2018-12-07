import React from "react";

export const List = ({ children }) => {
  return (
    <div> 
      <ul>
        {children}
      </ul>
    </div>
  );
};