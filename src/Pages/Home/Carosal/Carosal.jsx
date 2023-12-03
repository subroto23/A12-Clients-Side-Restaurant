import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
const Carosal = () => {
  const handleCatagorySubmit = (e) => {
    e.preventDefault();
  };
  const OverLay = (title, subtitle) => (
    <>
      {/* Overlay */}
      <div className="absolute top-0 left-0  bottom-0 w-full h-full flex flex-col justify-center items-center text-gray-200 md:h-[100%] lg:h-[100%] bg-black/60">
        <h1 className="px-4 text-2xl sm:text-sm md:text-3xl lg:text-4xl font-bold">
          {title}
        </h1>
        <h1 className="px-4 md:text-xl text-xs font-bold md:mt-6 mt-2 text-center">
          <span>{subtitle}</span>
        </h1>
        {/* Form Group start*/}
        <div className="mt-6 flex md:border-8 border-gray-500 md:rounded-full">
          <div className="md:flex hidden justify-between max-w-md p-1 bg-white shadow-lg overflow-hidden mx-auto rounded-l-full">
            <form className="flex justify-center items-center">
              <input
                type="text"
                className="outline-none py-4 pl-4 text-black "
                placeholder="Fast Foods"
              />
              <button
                type="submit"
                className="flex-end  text-orange-400 mr-6 font-bold text-2xl outline-none rounded-full text-center uppercase"
              >
                <FaSearch />
              </button>
            </form>
          </div>
          <div className="md:flex hidden justify-between max-w-md p-1 bg-white shadow-lg border-l-2 overflow-hidden mx-auto">
            <form className="flex justify-center items-center">
              <input
                type="text"
                className="outline-none py-4 text-black pl-4 md:block hidden "
                placeholder="Lalan Shah Hall"
              />
              <button
                type="submit"
                className="flex-end text-orange-400 mr-6 font-bold text-2xl outline-none rounded-full text-center uppercase md:block hidden "
              >
                <FaLocationDot />
              </button>
            </form>
          </div>
          <div className="flex justify-between max-w-md bg-white shadow-lg md:border-l-2 overflow-hidden rounded-full md:rounded-l-none  mx-auto">
            <form
              onSubmit={handleCatagorySubmit}
              className="flex justify-between"
            >
              <input
                type="text"
                name="searchValue"
                className="outline-none py-4 w-1/2 pl-2 text-black"
                placeholder="Search Foods"
              />
              <button
                type="submit"
                className="flex-end bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-400 hover:to-orange-600 md:py-3 md:px-8 px-4 py-2 font-bold text-xl outline-none rounded-full text-center"
              >
                Search
              </button>
            </form>
          </div>
        </div>
        {/* Form Group End*/}
      </div>
    </>
  );
  return (
    <div>
      <Carousel autoPlay={true} infiniteLoop={true}>
        <div className="relative">
          <img src="https://i.ytimg.com/vi/TLGb8Cxx9Jc/maxresdefault.jpg" />
          {OverLay("Fuska", "Flavor Explosion")}
        </div>
        {/* @nd Photo */}
        <div>
          <img src="https://i.ytimg.com/vi/m8pSoIGK44E/maxresdefault.jpg" />
          {OverLay("Hilisha Fish Fry", "Delicious Food")}
        </div>
        <div>
          <img src="https://i.ytimg.com/vi/HlK5iPCk_DY/maxresdefault.jpg" />
          {OverLay("Koi in Spicy Mustard Gravy", "Traditional Food")}
        </div>
      </Carousel>
    </div>
  );
};

export default Carosal;
