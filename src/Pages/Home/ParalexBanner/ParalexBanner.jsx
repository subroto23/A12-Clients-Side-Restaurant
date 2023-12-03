const ParalexBanner = () => {
  return (
    <div className="">
      <div className="bg-no-repeat bg-fixed bg-cover bg-[url('https://publish.com.ua/images/2022/02/20/fruttaverdura-min_large.jpg')]">
        <div className="flex flex-col justify-center items-center bg-[#071e34] bg-opacity-50 md:py-24 py-10">
          <h1 className="uppercase md:text-4xl text-xl text-white font-bold">
            HOT Deal of the Day
          </h1>
          <p className="text-white w-1/2 my-6 text-center">
            Kacchi Biryani is a fragrant and rich rice dish where marinated meat
            is layered with partially cooked rice and slow-cooked, allowing the
            flavors to meld together.
          </p>
          <button className="flex items-center justify-center h-12 px-12 text-sm uppercase bg-gradient-to-l from-orange-500 to-orange-700 hover:bg-gredient-to-r hover:bg-orange-800 hover:to-orange-500 hover:font-bold text-white rounded-full">
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParalexBanner;
