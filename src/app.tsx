import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Pages
import { PageCreateTrip } from "./pages/create-trip";
import { PageTripDashboard } from "./pages/trip-dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageCreateTrip />,
  },
  {
    path: '/trips/:tripID',
    element: <PageTripDashboard />
  }
]);

export function App() {
  return <RouterProvider router={router} />
}