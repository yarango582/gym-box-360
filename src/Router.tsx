import { createBrowserRouter } from "react-router-dom";
import { ErrorPage, Login } from "./components";
import App from "./App";


const router = createBrowserRouter([
    {
      path: "/",
      element: <ErrorPage />,
    },
    {
      path: "/dashboard",
      element: <App />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <Login/>,
      errorElement: <ErrorPage />,
    }
])

export default router;