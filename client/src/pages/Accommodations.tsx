import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import AddPlaces from "./AddPlaces";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsFillHouseExclamationFill } from "react-icons/bs";

const Accommodations = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(true);
  const [places, setPlaces] = useState([]);
  function handleClick() {
    setToggle(!toggle);
    if (id) {
      navigate("/user/account/myaccommodations");
      window.location.reload();
    }
  }
  useEffect(() => {
    axios.get("/user/places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div>
      <div
        className={!id && toggle ? "block w-[920px] mx-auto pb-20" : "hidden"}
      >
        <button
          className="button-full duration-200 hover:button-outline"
          onClick={handleClick}
        >
          <div className="flex">
            <CiCirclePlus size={20} className="mt-[0.14rem] mr-1" /> Add new
            place
          </div>
        </button>

        {places.length > 0 ? (
          places.map((place: any) => (
            <Link
              key={place._id}
              to={"/user/account/myaccommodations/" + place._id}
            >
              <div className=" hover:bg-gray-100 my-4 grid grid-cols-5 bg-gray-200/70 duration-200 rounded-xl cursor-pointer p-4">
                <img
                  src={"http://localhost:3000/uploads/" + place.photos[0]}
                  alt="No Img"
                  className="object-cover min-h-32 h-full w-full bg-red-400 rounded-r rounded-xl"
                />
                <div className="col-span-4 text-left my-auto ml-8">
                  <div className="text-2xl font-medium pb-3">{place.title}</div>
                  <div className="flex space-x-2 text-stone-700 text-justify">
                    {place.desc}
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="cursor-default my-36 text-2xl items-center">
            <div className="flex items-center space-x-4 justify-center text-stone-800">
              <BsFillHouseExclamationFill className="" />
              <div>No places yet...</div>
            </div>
          </div>
        )}
      </div>
      <div
        className={
          !id && toggle ? "hidden" : " max-w-[920px] relative mx-auto "
        }
      >
        <AddPlaces changeVisible={handleClick} />
      </div>
    </div>
  );
};

export default Accommodations;
