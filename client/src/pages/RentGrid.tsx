import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RentGrid = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/place").then((response) => setPlaces(response.data));
  }, []);
  return (
    <div className="grid pt-12 pb-24 grid-cols-3 w-[920px] mx-auto gap-6">
      {places.length > 0 &&
        places.map((place: any) => (
          <Link key={place._id} to={"/place/" + place._id}>
            <div className=" font-poppins space-y-1 hover:cursor-pointer hover:scale-105 duration-200">
              <img
                src={"http://localhost:3000/uploads/" + place.photos[0]}
                alt="Cover Img"
                className="mb-2 rounded-xl object-cover h-[35vh]"
              />
              <div className="font-semibold text-lg">{place.title}</div>
              <div className="font-light">{place.address}</div>
              <div className="flex space-x-1">
                <div className="font-semibold">{place.price}$</div>
                <div>per night</div>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default RentGrid;
