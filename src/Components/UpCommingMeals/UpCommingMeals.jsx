import HelmetHookes from "../../Hookes/ReactHelmet/Helmet";
import UseUpcommingMeals from "../../Hookes/Upcomming/UseUpcommingMeals";

const UpCommingMeals = () => {
  const [upcommingMeals] = UseUpcommingMeals();
  return (
    <div>
      <HelmetHookes title={"Upcomming Meals || pages"}></HelmetHookes>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-center">
            {/* head */}
            <thead>
              <tr className="bg-orange-400 text-white  text-center">
                <th>#</th>
                <th>Title</th>
                <th>Likes</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {upcommingMeals.map((data, idx) => {
                return (
                  <tr key={data._id}>
                    <th>{idx + 1}</th>
                    <td>{data.title}</td>
                    <td>{data.likes.length}</td>
                    <td>
                      {data?.likes >= 10 ? (
                        <>
                          {" "}
                          <button className="hover:text-black text-green-600 font-bold">
                            Add Meals
                          </button>
                        </>
                      ) : (
                        <>Publish</>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UpCommingMeals;
