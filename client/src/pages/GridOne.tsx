const GridOne = () => {
  return (
    <div className=" font-poppins">
      <img
        src="https://images.pexels.com/photos/6691568/pexels-photo-6691568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt=""
        className="mb-2 rounded-xl object-cover h-[35vh]"
      />
      <div className=" font-semibold text-lg">BraLand, Sweden</div>
      <div className=" font-light">
        uniquely designed organic naturehouse, off-grid
      </div>
      <div className=" flex space-x-2">
        <div className="font-semibold">120$</div>
        <div className=" font-medium">per night</div>
      </div>
    </div>
  );
};

export default GridOne;
