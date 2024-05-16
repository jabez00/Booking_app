import { Route, Routes } from "react-router-dom";
import RentGrid from "./pages/RentGrid";
import Login from "./pages/Login";
import Layout from "./Layout";
import SignUp from "./pages/SignUp";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import Accounts from "./pages/Accounts";
import Bookings from "./pages/Bookings";
import Accommodations from "./pages/Accommodations";
import PlacePage from "./pages/PlacePage";
import BookingDetails from "./pages/BookingDetails";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<RentGrid />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/signup" element={<SignUp />} />
          <Route path="/user/account" element={<Accounts />}>
            <Route path="/user/account/mybookings" element={<Bookings />} />
            <Route
              path="/user/account/mybookings/:id"
              element={<BookingDetails />}
            />
            <Route
              path="/user/account/myaccommodations"
              element={<Accommodations />}
            />
            <Route
              path="/user/account/myaccommodations/:id"
              element={<Accommodations />}
            />
          </Route>
          <Route path="/place/:id" element={<PlacePage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
