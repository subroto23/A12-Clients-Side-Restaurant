import UseAllMeals from "../../Hookes/AllMeals/UseAllMeals";
import UseAuth from "../../Hookes/AuthUser/UseAuth";
import HelmetHookes from "../../Hookes/ReactHelmet/Helmet";
import UseSectionTitle from "../../Hookes/SectionTitle/UseSectionTitle";

const AdminProfile = () => {
  const { user } = UseAuth();
  const [meals] = UseAllMeals();
  const filter = meals.filter((data) => data.email === user?.email);
  const SectionTitle = UseSectionTitle("Your", "Profile");
  return (
    <div>
      <HelmetHookes
        title={`${user?.displayName} Profile || Pages`}
      ></HelmetHookes>
      {SectionTitle}
      <div className="flex font-medium items-center justify-center h-full">
        <section className="lg:w-2/6 w-full mx-auto bg-orange-700 rounded-2xl px-8 py-6 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-white text-sm flex items-center">
              <span className="loading loading-ring text-green-600 loading-md ml-2"></span>
              Active
            </span>
            <span className="text-emerald-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </span>
          </div>
          <div className="mt-6 w-fit mx-auto">
            <img
              src={user?.photoURL}
              className="rounded-full w-28 "
              alt="profile picture"
            />
          </div>

          <div className="mt-8 ">
            <h2 className="text-white font-bold text-2xl tracking-wide">
              {user?.displayName}
            </h2>
          </div>
          <p className="text-emerald-400 font-semibold mt-2.5">{user?.email}</p>

          <div className="h-1 w-full bg-black mt-8 rounded-full">
            <div className="h-1 rounded-full w-2/5 bg-yellow-500 "></div>
          </div>
          <div className="mt-3 text-white text-sm">
            <span className="text-gray-400 font-semibold">
              Added
              <span className="mx-2 text-green-400">{filter.length} </span>
              Meals
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminProfile;
