import "../styles/PageNotFound.css";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found </h1>
      <p>The page you are looking for doesn't exist. </p>
      <a href="/">Go back to home</a>
    </div>
  );
};

export default NotFound;
