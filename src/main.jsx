import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import AdminDashboard from "./components/Dashboard/AdminDashboard.jsx";
import UserDashboard from "./components/Dashboard/UserDashboard.jsx";
import PrivateRoute from "./components/Auth/PrivateRoute.jsx";
import Login from "./components/Auth/Login.jsx";
import UserTasks from "./components/others/UserTasks.jsx";

// Define your router with routes

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "admin",
        element: (
          <PrivateRoute restricted={false}>
            <AdminDashboard />
          </PrivateRoute>
        ),
        children: [
          {
            path: "employee/:id",
            element: (
              <PrivateRoute>
                <UserTasks />
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: "employee/:id",
        element: (
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        element: (
          <PrivateRoute>
            <Login />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

// Render the app with RouterProvider
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
