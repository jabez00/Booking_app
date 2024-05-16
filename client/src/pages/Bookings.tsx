import axios from "axios";
import { useEffect, useState } from "react";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoCalendarOutline } from "react-icons/io5";
import { LuMoon } from "react-icons/lu";
import { Link, useNavigate, useParams } from "react-router-dom";
import BookingDetails from "./BookingDetails";
import { BsFillHouseExclamationFill } from "react-icons/bs";

const Bookings = () => {
  const { id } = useParams();
  const [bookings, setBookings] = useState([]);
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();
  function handleClick() {
    setToggle(!toggle);
    if (id) {
      navigate("/user/account/mybookings");
      window.location.reload();
    }
  }
  useEffect(() => {
    axios.get("/user/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);
  return (
    <div className="w-[920px] mx-auto ">
      <div className={!id && toggle ? "block pb-20" : "hidden"}>
        {bookings.length > 0 ? (
          bookings.map((booking: any) => (
            <Link
              key={booking._id}
              to={
                "http://localhost:5173/user/account/mybookings/" + booking._id
              }
            >
              <div className=" grid grid-cols-5 mb-4 bg-gray-200 rounded-xl cursor-pointer">
                <img
                  src={
                    "http://localhost:3000/uploads/" +
                    booking.place_id.photos[0]
                  }
                  alt="cover-photo"
                  className=" rounded-r rounded-xl"
                />
                <div className="col-span-4 text-left my-auto ml-8">
                  <div className="text-xl font-medium pb-3">
                    {booking.place_id.title}
                  </div>
                  <div className="flex space-x-2 text-stone-700">
                    <div className="flex">
                      <LuMoon className="mt-1" />
                      <div className="ml-1">{booking.bookedDays} nights:</div>
                    </div>
                    <div className="flex">
                      <IoCalendarOutline className="mt-1" />
                      <div className="ml-1">
                        {booking.checkIn.split("T")[0]}
                      </div>
                    </div>
                    <IoIosArrowRoundForward
                      size={20}
                      className="mt-[0.125rem]"
                    />
                    <div className="flex">
                      <IoCalendarOutline className="mt-1" />
                      <div className="ml-1">
                        {booking.checkOut.split("T")[0]}
                      </div>
                    </div>
                  </div>
                  <div className="flex font-semibold pt-1">
                    <FaMoneyCheckDollar size={20} className="mt-[0.16rem]" />
                    <div className="ml-1">Total Price: ${booking.price}</div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="cursor-default my-36 text-2xl items-center">
            <div className="flex items-center space-x-4 justify-center text-stone-800">
              <BsFillHouseExclamationFill />
              <div>No Bookings yet...</div>
            </div>
          </div>
        )}
      </div>
      <div className={!id && toggle ? "hidden" : " block"}>
        <BookingDetails changeVisible={handleClick} />
      </div>
    </div>
  );
};

export default Bookings;
