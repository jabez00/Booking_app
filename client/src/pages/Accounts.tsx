import { useContext, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MdChecklist, MdMapsHomeWork } from "react-icons/md";
import { userContext } from "../UserContext";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Bookings from "./Bookings";
import Accommodations from "./Accommodations";

const Accounts = () => {
  const { user, ready, setUser } = useContext(userContext);
  const [profile, setProfile] = useState(true);
  const [bookings, setBookings] = useState(false);
  const [accommodations, setAccommodations] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  function handleProfile() {
    setProfile(true);
    setAccommodations(false);
    setBookings(false);
    navigate("/user/account");
  }
  function handleBookings() {
    setProfile(false);
    setBookings(true);
    setAccommodations(false);
    navigate("/user/account/mybookings");
  }
  function handleAccommodations() {
    setProfile(false);
    setBookings(false);
    setAccommodations(true);
    navigate("/user/account/myaccommodations");
  }
  let subpage = pathname.split("/")?.[3];
  if (subpage === undefined) {
    subpage = "profile";
  }
  async function logout() {
    await axios.post("/user/logout");
    setUser(null);
    navigate("/user/login");
  }
  if (!ready) {
    return (
      <div className="text-center text-2xl font-poppins font-bold py-16">
        Loading...
      </div>
    );
  }
  if (ready && !user) {
    return <Navigate to={"/user/login"} />;
  }
  return (
    <div className="text-center space-y-12 ">
      <div className="space-x-4 flex justify-center">
        <button
          className={`${
            subpage === "profile" && profile ? "button-full" : "button-outline"
          } flex space-x-2 `}
          onClick={handleProfile}
        >
          <CgProfile size={25} />
          <div className="">My profile</div>
        </button>
        <button
          className={`${
            subpage === "mybookings" || bookings
              ? "button-full"
              : "button-outline"
          } flex space-x-2 `}
          onClick={handleBookings}
        >
          <MdChecklist size={25} />
          <div>My bookings</div>
        </button>
        <button
          className={`${
            subpage === "myaccommodations" || accommodations
              ? "button-full"
              : "button-outline"
          } flex space-x-2 `}
          onClick={handleAccommodations}
        >
          <MdMapsHomeWork size={25} />
          <div>My accommodations</div>
        </button>
      </div>
      {subpage === "profile" && profile && (
        <div className="pb-[12.65rem]">
          <div className="pb-8 font-poppins text-lg">
            Logged in as {user.name} ({user.email})
          </div>
          <button
            onClick={logout}
            className="button-full px-20 hover:px-20 hover:button-outline"
          >
            Logout
          </button>
        </div>
      )}
      {(subpage === "mybookings" || bookings) && <Bookings />}
      {(subpage === "myaccommodations" || accommodations) && <Accommodations />}
    </div>
  );
};

export default Accounts;
