import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { TbBrandAirbnb } from "react-icons/tb";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="px-28 rounded-t-full flex h-44 text-center justify-between bg-gradient-to-tr from-red-300 to-pink-300">
      <div className="flex pt-2 my-auto text-rose-950 items-center h-full ">
        <TbBrandAirbnb size={35} />
        <div className="text-3xl font-bold ml-1 ">AirBNB</div>
      </div>
      <div className="flex space-x-8 pt-2 items-center text-xl ">
        <Link
          to={"/"}
          className="hover:cursor-pointer hover:text-rose-600/70 duration-200 text-white"
        >
          Home
        </Link>
        <Link
          to={"/user/account"}
          className="hover:cursor-pointer hover:text-rose-600/70 duration-200 text-white"
        >
          Profile
        </Link>
        <Link
          to={"/user/account/mybookings"}
          className="hover:cursor-pointer hover:text-rose-600/70 duration-200 text-white"
        >
          Bookings
        </Link>
        <Link
          to={"/user/account/myaccommodations"}
          className="hover:cursor-pointer hover:text-rose-600/70 duration-200 text-white"
        >
          Your Places
        </Link>
      </div>
      <div className="flex flex-col pb-3 relative text-right text-white my-auto pr-10">
        <div className="text-xl">Contact us</div>
        <div className="cursor-pointer hover:underline">example@email.com</div>
        <div className="cursor-pointer hover:underline">+99 88 7777 6666</div>
        <div className="text-xl flex flex-cols space-x-4 absolute right-10 top-[4.9rem]">
          <FaInstagram className="hover:text-rose-600/70 duration-200 cursor-pointer" />
          <FaFacebook className="hover:text-rose-600/70 duration-200 cursor-pointer" />
          <FaXTwitter className="hover:text-rose-600/70 duration-200 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
