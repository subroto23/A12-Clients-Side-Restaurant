import UseAxiosSecure from "../../Hookes/AxiosPrivate/UseAxiosSecure";
import UseUpcommingMeals from "../../Hookes/Upcomming/UseUpcommingMeals";
import { SlLike } from "react-icons/sl";
import { AiFillLike } from "react-icons/ai";
import UseAuth from "../../Hookes/AuthUser/UseAuth";
import UseSectionTitle from "../../Hookes/SectionTitle/UseSectionTitle";

const Upcomming = () => {
  const [upcommingMeals, loader, refetch] = UseUpcommingMeals();
  const { user } = UseAuth();
  const SectionTitle = UseSectionTitle(
    "Upcomming",
    "Meals",
    "md:mt-28 md:mb-16"
  );
  const AxiosSecure = UseAxiosSecure();
  if (loader) {
    return <span className="loading loading-dots loading-lg"></span>;
  }
  const handleClicked = (data) => {
    //Handle Like Counts
    AxiosSecure.patch(`/api/upcomming/meal/likes/count?id=${data?._id}`, {
      email: user?.email,
    }).then(() => {
      refetch();
    });
  };
  return (
    <div>
      {SectionTitle}
      <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
        {upcommingMeals.map((data) => {
          return (
            <div key={data._id} className="flex justify-center px-2">
              <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="max-w-md mx-auto">
                  <div className="relative">
                    <img
                      src={data?.imageUrl}
                      className="w-full md:h-[250px] object-cover  hover:skew-y-2 duration-75"
                      alt=""
                    />
                    <div>
                      <strong className="bg-orange-400 rounded px-2 py-1 absolute top-12 text-sm  -rotate-45 shadow-md">
                        Upcomming
                      </strong>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <p className="font-bold text-gray-700 text-[22px] leading-7 mb-1">
                      {data.title}
                    </p>
                    <div className="flex flex-row">
                      <p className="text-[#3C3C4399] text-[17px] mr-2 line-through">
                        Price {Number(data.price) + 50}
                      </p>
                      <p className="text-[17px] font-bold text-orange-400">
                        {data.price}
                      </p>
                    </div>
                    <div className="text-justify text-gray-300 leading-normal">
                      <div
                        dangerouslySetInnerHTML={{ __html: data.Ingredients }}
                        className="text-[#7C7C80] font-[15px] mt-6"
                      ></div>
                    </div>
                    <div className="text-right mt-1">
                      {data?.likes.includes(user?.email) ? (
                        <>
                          <button
                            onClick={() => handleClicked(data)}
                            disabled={true}
                            className="px-4 py-2 text-2xl  text-orange-400 border border-orange-400 rounded-md"
                          >
                            <AiFillLike />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleClicked(data)}
                          className="border border-orange-400 px-4 py-2 text-2xl  text-orange-400 rounded-md hover:bg-orange-400 hover:text-white"
                        >
                          <SlLike />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Upcomming;
