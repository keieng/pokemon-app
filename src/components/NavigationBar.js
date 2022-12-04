import React from "react";
import Navbar from "react-bootstrap/Navbar";

export const NavigationBar = () => {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        {/* <Container> */}
        <Navbar.Brand href="/" className="ps-3">
          {/* <img
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "} */}
          ポケモン図鑑
        </Navbar.Brand>
        {/* </Container> */}
      </Navbar>
    </>
  );
};
