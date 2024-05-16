import { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";
import { TbBrandAirbnb } from "react-icons/tb";
import { Link } from "react-router-dom";
import { userContext } from "../UserContext";
const NavBar = () => {
  const { user } = useContext(userContext);
  return (
    <div className="w-[920px] mx-auto my-10 flex font-poppins">
      <Link
        to={"/"}
        className="flex my-auto hover:text-rose-500/90 duration-200 hover:scale-105"
      >
        <TbBrandAirbnb size={35} />
        <div className="text-3xl font-bold ml-1">AirBNB</div>
      </Link>
      <div className="cursor-default rounded-full my-1 py-1 px-2 space-x-2 border-gray-300 border-2 shadow-md mx-auto flex">
        <div>Anywhere</div>
        <div className="border-gray-300 border-r-2"></div>
        <div>Any week</div>
        <div className="border-gray-300 border-r-2"></div>
        <div>Add guests</div>
        <button className=" bg-red-500 rounded-full text-white px-1">
          <IoSearch />
        </button>
      </div>
      <Link
        to={user == null ? "/user/login" : "/user/account"}
        className="my-auto flex space-x-2 border-2 p-2 rounded-full duration-200 hover:border-stone-500"
      >
        {!!user && <div>{user.name}</div>}
        <CgProfile size={25} />
      </Link>
    </div>
  );
};

export default NavBar;
