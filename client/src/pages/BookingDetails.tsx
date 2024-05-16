import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaLocationDot, FaRegImages } from "react-icons/fa6";
import { IoIosArrowDropleft, IoIosArrowRoundForward } from "react-icons/io";
import { IoCalendarOutline, IoClose } from "react-icons/io5";
import { LuMoon } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";

const BookingDetails = ({ changeVisible }: any) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notification, setNotification] = useState(false);
  const [book, setBook] = useState({
    bookedDays: 0,
    checkIn: "",
    checkOut: "",
    guests: 0,
    mobile: 0,
    place_id: {
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
      _id: "",
    },
    price: 0,
    user_id: "",
    _id: "",
  });
  const [photoAlbum, setPhotoAlbum] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/book/" + id).then((response) => {
      const data = response.data;
      setBook(data);
      console.log(data, book);
    });
  }, [id]);
  function handleAlbum() {
    setPhotoAlbum(!photoAlbum);
  }
  async function handleDelete() {
    await axios.delete("/user/bookings", { data: { id: id } });
    setTimeout(() => {
      navigate("/user/account/mybookings");
      window.location.reload();
      setNotification(false);
    }, 2000);
    setNotification(true);
  }
  return (
    <>
      <div
        className={
          photoAlbum
            ? "top-0 right-0 py-16 w-screen bg-[#FFF5F5] absolute z-10"
            : "hidden"
        }
      >
        <div className="text-3xl text-black/80 font-semibold cursor-default text-center">
          Photos of {book.place_id.title}
        </div>
        {book.place_id.photos.map((photo) => (
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
      <div className=" pb-10 pl-2">
        <div
          className={`
          ${
            notification ? "block" : "hidden"
          } transition-opacity ease-in-out delay-150 duration-300 fixed top-8 right-8 py-2 px-4 bg-green-500/90 rounded-md text-white z-10`}
        >
          Deleted succesfully!
        </div>
        <div className="flex  justify-between">
          <div>
            <div className=" text-3xl font-semibold text-left pt-2">
              {book.place_id.title}
            </div>
            <div className="flex ">
              <FaLocationDot className="mt-1 ml-2" />
              <a
                target="_blank"
                href={"https://maps.google.com/?q=" + book.place_id.address}
                className="underline ml-1"
              >
                {book.place_id.address}
              </a>
            </div>
          </div>
          <button
            className="my-auto hover:text-red-500 hover:scale-125 duration-200"
            onClick={() => changeVisible()}
          >
            <IoIosArrowDropleft size={30} />
          </button>
        </div>
        <div className="bg-gray-200 rounded-xl p-8 m-4 grid grid-cols-5">
          <div className="col-span-4 space-y-4">
            <div className="text-left text-xl font-medium">
              Your Booking information:
            </div>
            <div className="">
              <div className="flex space-x-2 ">
                <div className="flex">
                  <LuMoon className="mt-1" />
                  <div className="ml-1">{book.bookedDays} nights:</div>
                </div>
                <div className="flex">
                  <IoCalendarOutline className="mt-1" />
                  <div className="ml-1">{book.checkIn.split("T")[0]}</div>
                </div>
                <IoIosArrowRoundForward size={20} className="mt-[0.125rem]" />
                <div className="flex">
                  <IoCalendarOutline className="mt-1" />
                  <div className="ml-1">{book.checkOut.split("T")[0]}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-xl p-2 bg-rose-500/90 text-white">
            <div className="">Total price</div>
            <div className="font-medium text-lg">${book.price}</div>
          </div>
        </div>
        <div className="grid grid-cols-3 max-h-[500px] grid-rows-2 gap-4 pb-12 relative">
          <img
            onClick={handleAlbum}
            src={"http://localhost:3000/uploads/" + book.place_id.photos[0]}
            className="object-cover h-full cursor-pointer w-full row-span-2 col-span-2 rounded-l-2xl"
          />
          <img
            onClick={handleAlbum}
            src={"http://localhost:3000/uploads/" + book.place_id.photos[1]}
            className="object-cover h-full cursor-pointer w-full rounded-tr-2xl"
          />
          <img
            onClick={handleAlbum}
            src={"http://localhost:3000/uploads/" + book.place_id.photos[2]}
            className="object-cover h-full cursor-pointer w-full rounded-br-2xl"
          />
          <button
            onClick={handleAlbum}
            className="absolute bg-stone-200 hover:bg-slate-200/80 hover:cursor-pointer  bottom-14 right-2 rounded-xl py-1 px-2 flex font-medium"
          >
            <FaRegImages className="mt-1 mr-1" />
            Show more photos
          </button>
        </div>
        <button
          onClick={handleDelete}
          className="button-full hover:bg-rose-600 items-center flex justify-center duration-150 mt-2 mb-10 w-full"
        >
          Delete this Booking <FaRegTrashAlt className="ml-2" />
        </button>
      </div>
    </>
  );
};

export default BookingDetails;
