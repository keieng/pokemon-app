import React from "react";
import { Spinner } from "react-bootstrap";

export const Loading = () => {
  return (
    <h1>
      Loading
      <Spinner animation="grow" />
    </h1>
  );
};
