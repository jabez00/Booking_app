import axios from "axios";
import { addDays, differenceInCalendarDays, format } from "date-fns";
import { FormEvent, useContext, useEffect, useState } from "react";
import { FaCheck, FaLocationDot, FaRegImages } from "react-icons/fa6";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import { userContext } from "../UserContext";

const PlacePage = () => {
  const currentDate = new Date().toISOString().split("T")[0];
  const { user } = useContext(userContext);
  const navigate = useNavigate();
  const [place, setPlace] = useState({
    address: "",
    checkIn: 0,
    checkOut: 0,
    desc: "",
    extraInfo: "",
    maxGuests: 0,
    owner: "",
    perks: [],
    photos: [],
    price: 0,
    title: "",
    __v: 0,
    _id: "",
  });
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState<any | null>(1);
  const [mobile, setMobile] = useState<any | null>();
  const [photoAlbum, setPhotoAlbum] = useState(false);
  const [notification, setNotification] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    axios.get("/place/" + id).then((response) => {
      setPlace(response.data);
    });
  }, [id]);
  function handleAlbum() {
    setPhotoAlbum(!photoAlbum);
  }
  const bookedDays = differenceInCalendarDays(
    new Date(checkOut),
    new Date(checkIn)
  );
  async function book(event: FormEvent) {
    event.preventDefault();
    const user_id = user._id;
    const bookingData = {
      checkIn,
      checkOut,
      guests,
      mobile,
      bookedDays,
      place_id: id,
      user_id,
      price: bookedDays * place.price,
    };
    const response = await axios.post("/book", bookingData);
    const bookingId = response.data._id;
    setTimeout(() => {
      navigate(`/user/account/mybookings/${bookingId}`);
    }, 2000);
    setNotification(true);
    //thow notification for booking succesful
    setCheckIn("");
    setCheckOut("");
    setGuests(1);
    setMobile("");
  }

  return (
    <div className="">
      <div
        className={
          photoAlbum
            ? "block top-0 py-16 w-screen bg-[#FFF5F5] absolute z-10"
            : "hidden"
        }
      >
        <div className="text-3xl text-black/80 font-semibold cursor-default text-center">
          Photos of {place.title}
        </div>
        {place.photos.map((photo) => (
          <img
            key={photo}
            className="mx-auto h-[70vh] rounded-md w-[50vw] object-cover my-8"
            src={"http://localhost:3000/uploads/" + photo}
          />
        ))}
        <button
          className="bg-white py-1 pl-2 border hover:border-gray-500 border-white pr-3 rounded-full shadow-lg flex items-center  fixed top-10 left-10"
          onClick={handleAlbum}
        >
          <IoClose size={20} /> Close
        </button>
      </div>
      <div className="max-w-[920px] mx-auto py-12 relative">
        <div
          className={`
          ${
            notification ? "block" : "hidden"
          } transition-opacity ease-in-out delay-150 duration-300 fixed top-8 right-8 py-2 px-4 bg-green-500/90 rounded-md text-white z-10`}
        >
          Booked succesfully!
        </div>
        <div className="text-3xl font-semibold cursor-default">
          {place.title}
          <Link to={"/"}>
            <IoIosArrowDropleft
              className="cursor-pointer absolute top-14 right-8 hover:scale-110 hover:text-red-500 duration-200"
              size={35}
            />
          </Link>
        </div>
        <div className="flex underline items-center pb-8 cursor-default">
          <FaLocationDot className="mr-1" />
          <a
            target="_blank"
            href={"https://maps.google.com/?q=" + place.address}
          >
            {place.address}
          </a>
        </div>
        <div className="grid grid-cols-3 max-h-[420px] grid-rows-2 gap-4 pb-12 relative mx-auto w-[800px]">
          <img
            onClick={handleAlbum}
            src={"http://localhost:3000/uploads/" + place.photos[0]}
            className="object-cover h-full cursor-pointer w-full row-span-2 col-span-2 rounded-l-2xl"
          />
          <img
            onClick={handleAlbum}
            src={"http://localhost:3000/uploads/" + place.photos[1]}
            className="object-cover h-full cursor-pointer w-full rounded-tr-2xl"
          />
          <img
            onClick={handleAlbum}
            src={"http://localhost:3000/uploads/" + place.photos[2]}
            className="object-cover h-full cursor-pointer w-full rounded-br-2xl"
          />
          <button
            onClick={handleAlbum}
            className="absolute bg-slate-100 duration-150 hover:bg-slate-200/80 hover:cursor-pointer  bottom-14 right-2 rounded-xl py-1 px-2 flex font-medium"
          >
            <FaRegImages className="mt-1 mr-1" />
            Show more photos
          </button>
        </div>
        <div className="grid grid-cols-2">
          <div className="bg-stone-200/30 rounded-xl m-2 p-4">
            <div className="font-medium text-xl pb-2">Description</div>
            <div className=" text-justify mx-2 pb-2">{place.desc}</div>
            <div className="grid grid-cols-2 mt-2 font-medium">
              <div>
                <div>Check-in: {place.checkIn} AM</div>
                <div>Check-out: {place.checkOut} PM</div>
              </div>
              <div className="my-auto">Maximum Guests: {place.maxGuests}</div>
            </div>
            <div className="py-1 font-medium text-lg">Features:</div>
            <span className="flex items-center capitalize">
              {place.perks.map((perk) => (
                <>
                  <FaCheck className="ml-3 mr-1" /> {perk}
                </>
              ))}
            </span>
          </div>
          <div className=" bg-white rounded-2xl m-2 text-center flex flex-col justify-between">
            <div className="font-medium text-lg py-4">
              Price: ${place.price} / night
            </div>
            <form
              onSubmit={book}
              id="bookingForm"
              className="flex flex-col  mx-4"
            >
              <div className="border-2 rounded-xl mb-2">
                <div className="grid grid-cols-2  border-b-2  py-2">
                  <div className=" ">
                    <label htmlFor="" className="flex pb-1 ml-[1.66rem]">
                      Check-in:
                    </label>
                    <input
                      type="date"
                      min={currentDate}
                      value={checkIn}
                      onChange={(ev) => {
                        setCheckIn(ev.target.value);
                      }}
                      className="border border-slate-200 rounded-xl px-1"
                    />
                  </div>
                  <div className="">
                    <label htmlFor="" className="pb-1 flex ml-[1.66rem]">
                      Check-Out:
                    </label>
                    <input
                      type="date"
                      min={
                        checkIn
                          ? format(new Date(addDays(checkIn, 1)), "yyyy-MM-dd")
                          : format(
                              new Date(addDays(currentDate, 1)),
                              "yyyy-MM-dd"
                            )
                      }
                      value={checkOut}
                      onChange={(ev) => {
                        setCheckOut(ev.target.value);
                      }}
                      className="border border-slate-200 rounded-xl px-1"
                    />
                  </div>
                </div>
                <div className="mx-6 py-2">
                  <label htmlFor="" className="flex pb-1">
                    Number of guests:
                  </label>
                  <input
                    type="number"
                    className="w-full border px-4 rounded-xl"
                    max={place.maxGuests}
                    min="1"
                    value={guests}
                    onChange={(ev) => {
                      setGuests(ev.target.value);
                    }}
                    defaultValue={1}
                  />
                </div>
                <div className="mx-6 pb-2">
                  <label htmlFor="" className="flex pb-1">
                    Phone Number:
                  </label>
                  <input
                    type="number"
                    placeholder="----- -----"
                    className="w-full border px-4 rounded-xl"
                    value={mobile}
                    onChange={(ev) => {
                      setMobile(ev.target.value);
                    }}
                  />
                </div>
              </div>
            </form>
            <button
              type="submit"
              form="bookingForm"
              className="mb-4 mx-4 button-full duration-150 hover:button-outline "
            >
              Book {checkIn && checkOut && <span>for {bookedDays} days</span>}
            </button>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl my-4">
          <div className="font-medium text-xl pb-2">Extra Info</div>
          <div className="text-justify mx-2 pb-2">{place.extraInfo}</div>
        </div>
      </div>
    </div>
  );
};

export default PlacePage;
