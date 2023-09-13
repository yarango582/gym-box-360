import { createBrowserRouter } from "react-router-dom";
import { About, ErrorPage } from "./components";
import App from "./App";


const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/about",
      element: <About/>,
    },
])

export default router;