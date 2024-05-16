import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoStar, IoStarOutline } from "react-icons/io5";
import { MdFileUpload } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

const AddPlaces = ({ changeVisible }: any) => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photos, setPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [desc, setDesc] = useState("");
  const [perks, setPerks] = useState<any | null>([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState<any | null>(1);
  const [price, setPrice] = useState<any | null>(0);
  const [notification, setNotification] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      return;
    }
    console.log(id);
    axios.get("place/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setPhotos(data.photos);
      setDesc(data.desc);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const placeData = {
      title,
      address,
      photos,
      desc,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id) {
      //Update exsiting place
      await axios.put("/user/places", {
        id,
        ...placeData,
      });
      changeVisible();
    } else {
      //Add new Place
      await axios.post("/user/places", placeData);
      window.location.reload();
    }
  }

  function addPhotoLink() {
    axios
      .post("user/upload-photo", { link: photoLink })
      .then((res) => {
        setPhotos((prev): any => {
          return [...prev, res.data];
        });
      })
      .catch((err) => {
        console.log(err);
      });
    setPhotoLink("");
  }
  function uploadPhoto(event: any) {
    const files = event.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/user/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        const { data: filenames } = res;
        setPhotos((prev): any => {
          return [...prev, ...filenames];
        });
      });
  }
  function handleCheck(event: any) {
    if (event.target.checked) {
      setPerks([...perks, event.target.value]);
    } else {
      setPerks([
        ...perks.filter((noName: string) => noName !== event.target.value),
      ]);
    }
  }
  function handleStarImg(link: never) {
    const newPhotos = photos.filter((photo) => photo !== link);
    const newPhotos2 = [link, ...newPhotos];
    setPhotos(newPhotos2);
    console.log("starred", link);
  }
  function handleDeleteImg(link: string) {
    setPhotos(photos.filter((photo) => photo !== link));
    console.log("deleted", link);
  }
  async function clearFrom() {
    setTitle("");
    setAddress("");
    setPhotos([]);
    setDesc("");
    setPerks([]);
    setExtraInfo("");
    setCheckIn("");
    setCheckOut("");
    setMaxGuests(1);
    setPrice(0);
    await axios.delete("/user/places", { data: { id: id } });
    setTimeout(() => {
      navigate("/user/account/myaccommodations");
      window.location.reload();
      setNotification(false);
    }, 2000);
    setNotification(true);
  }

  return (
    <div className="pb-10">
      <div
        className={`
          ${
            notification ? "opacity-100" : "opacity-0"
          } transition-opacity ease-in-out delay-150 duration-300 fixed top-8 right-8 py-2 px-4 bg-green-500/90 rounded-md text-white z-10`}
      >
        Deleted succesfully!
      </div>
      <button
        className="absolute right-0 hover:scale-110 hover:text-red-500 duration-200"
        onClick={() => changeVisible()}
      >
        <IoIosArrowDropleft size={30} />
      </button>
      <form
        onSubmit={handleSubmit}
        id="addPlaces"
        className="flex flex-col text-left font-poppins"
      >
        <label htmlFor="title" className="label-text">
          Title
        </label>
        <div className="text-gray-600 text-xs">
          Title for your place, should be short and catchy as in advertisment
        </div>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="Eg: My lovely apartment"
          className="border border-gray-300 rounded-lg p-2 mb-6 mt-2"
        />
        <label htmlFor="address" className="label-text">
          Address
        </label>
        <div className="text-gray-600 text-xs">Address to this place</div>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          placeholder="Address of Lovely Apartment..."
          className="border border-gray-300 rounded-lg p-2 mb-6 mt-2"
        />
        <div>
          <label htmlFor="photos" className="label-text">
            Photos
          </label>
          <div className="text-gray-600 text-xs">more = better</div>
          <div>
            <input
              type="text"
              id="photos"
              value={photoLink}
              onChange={(ev) => setPhotoLink(ev.target.value)}
              placeholder="Add using link ...jpg"
              className="border border-gray-300 rounded-lg p-2 mb-6 mt-2 w-[805px]"
            />{" "}
            <button
              onClick={addPhotoLink}
              type="button"
              className="bg-gray-200 p-2 rounded-lg hover:border-gray-400 hover:border border border-inherit"
            >
              Add photos
            </button>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-4 mb-4">
          {photos.length > 0 &&
            photos.map((link) => (
              <div className="relative" key={link}>
                <img
                  src={"http://localhost:3000/uploads/" + link}
                  alt={link}
                  className="h-24 rounded-lg mx-auto w-full object-cover"
                />
                {link === photos[0] ? (
                  <IoStar
                    onClick={() => handleStarImg(link)}
                    className="left-2 img-btn"
                    size={22}
                  />
                ) : (
                  <IoStarOutline
                    onClick={() => handleStarImg(link)}
                    className="left-2 img-btn"
                    size={22}
                  />
                )}

                <FaRegTrashAlt
                  onClick={() => handleDeleteImg(link)}
                  className="right-2 img-btn"
                  size={22}
                />
              </div>
            ))}
          <label className="cursor-pointer h-24 duration-100 flex justify-center items-center rounded-lg border border-gray-200 bg-slate-50 hover:border-gray-400">
            <input
              type="file"
              multiple
              className="hidden"
              onChange={uploadPhoto}
            />
            <MdFileUpload className="mt-1" />
            upload
          </label>
        </div>
        <label htmlFor="desc" className="label-text">
          Description
        </label>
        <div className="text-gray-600 text-xs">description of the place</div>
        <textarea
          id="desc"
          value={desc}
          onChange={(ev) => setDesc(ev.target.value)}
          className="border border-gray-300 rounded-lg p-2 mb-6 mt-2 h-[110px]"
        />
        <label htmlFor="perks" className="label-text">
          Perks
        </label>
        <div className="text-gray-600 text-xs">
          select all the perks of your place
        </div>
        <div className=" flex space-x-4 mt-2 mb-4 mx-auto">
          <label htmlFor="wifi" className="checkbox">
            <input
              value={"wifi"}
              onChange={handleCheck}
              type="checkbox"
              id="wifi"
              className="mr-2"
              checked={perks.includes("wifi")}
            />
            Wifi
          </label>
          <label htmlFor="parking" className="checkbox">
            <input
              value={"parking"}
              onChange={handleCheck}
              type="checkbox"
              id="parking"
              className="mr-2"
              checked={perks.includes("parking")}
            />
            Parking
          </label>
          <label htmlFor="tv" className="checkbox">
            <input
              value={"tv"}
              onChange={handleCheck}
              type="checkbox"
              id="tv"
              className="mr-2"
              checked={perks.includes("tv")}
            />
            TV
          </label>
          <label htmlFor="radio" className="checkbox">
            <input
              value={"radio"}
              onChange={handleCheck}
              type="checkbox"
              id="radio"
              className="mr-2"
              checked={perks.includes("radio")}
            />
            Radio
          </label>
          <label htmlFor="pets" className="checkbox">
            <input
              value={"pets"}
              onChange={handleCheck}
              type="checkbox"
              id="pets"
              className="mr-2"
              checked={perks.includes("pets")}
            />
            Pets
          </label>
          <label
            htmlFor="entrance"
            className="cursor-pointer rounded-lg w-32 h-20 text-center border border-gray-300 flex"
          >
            <input
              value={"entrance"}
              onChange={handleCheck}
              type="checkbox"
              className="ml-4"
              id="entrance"
              checked={perks.includes("entrance")}
            />
            <div className="flex items-center">Private Entrance</div>
          </label>
        </div>
        <label htmlFor="extraInfo" className="label-text">
          Extra Info
        </label>
        <div className="text-gray-600 text-xs">house rules, etc.</div>
        <textarea
          id="extraInfo"
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
          className="border border-gray-300 rounded-lg p-2 mb-6 mt-2 h-[110px]"
        />
        <label htmlFor="checkTimes" className="label-text">
          Check In & Check Out Time
        </label>
        <div className="text-gray-600 text-xs">
          Add check in and check out times <p></p> Note: add time spacings
          between guests
        </div>
        <div className="grid grid-cols-4 mt-2">
          <div>
            <label htmlFor="CI" className="ml-2">
              Check in Time
            </label>
            <input
              type="text"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              placeholder="12 : 00"
              className="border border-gray-300 rounded-lg p-2 mb-6 mt-2 w-[220px]"
            />
          </div>
          <div>
            <label htmlFor="CO" className="ml-2">
              Check out Time
            </label>
            <input
              type="text"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              placeholder="12 : 00"
              className="border border-gray-300 rounded-lg p-2 mb-6 mt-2 w-[220px]"
            />
          </div>
          <div>
            <label htmlFor="guests" className="ml-2">
              Max number of guests
            </label>
            <input
              type="number"
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
              className="border border-gray-300 rounded-lg p-2 mb-6 mt-2 w-[220px]"
            />
          </div>
          <div>
            <label htmlFor="price" className="ml-2">
              Price per night
            </label>
            <input
              type="number"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
              className="border border-gray-300 rounded-lg p-2 mb-6 mt-2 w-[220px]"
            />
          </div>
        </div>
        <button
          type="submit"
          form="addPlaces"
          className="button-full hover:bg-rose-600 duration-150 my-4"
          value="Submit"
        >
          Submit
        </button>
      </form>
      <button
        className={
          id
            ? "button-full hover:bg-rose-600 items-center flex justify-center duration-150 mt-2 mb-10 w-full"
            : "hidden"
        }
        onClick={clearFrom}
      >
        Clear From & Submit <FaRegTrashAlt className="ml-2" />
      </button>
    </div>
  );
};

export default AddPlaces;
