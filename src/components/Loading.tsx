import { Spinner } from "react-bootstrap";

/**
 * ローディング
 * @returns
 */
export const Loading = () => {
  return (
    <div className="vh-100 vw-100 d-flex justify-content-center align-items-center">
      <h1 className="display-4">
        <Spinner animation="grow" />
      </h1>
    </div>
  );
};
