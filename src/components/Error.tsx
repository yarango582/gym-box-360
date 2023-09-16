import { useEffect } from "react";

export const ErrorPage = () => {

  const redirect = () => {
    history.pushState(null, "", "/login");
    window.location.reload();
  };

  useEffect(() => {
    redirect();
  }, []);

  return (
    <div
      id="error-page"
      style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh"
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1>Oops!</h1>
        <p>Disculpa, esta ruta no es correcta</p>
      </div>
    </div>
  );
};