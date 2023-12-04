import UseAuth from "../../../Hookes/AuthUser/UseAuth";
import UseUsersTypes from "../../../Hookes/UsersType/UsersTypes";

const Profile = () => {
  const { user } = UseAuth();
  const [userCheck] = UseUsersTypes();
  return (
    <div className="bg-[#14aa52] h-screen text-white">
      <div className="grid md:grid-cols-8 grid-cols-1 py-6 px-4">
        <div className="col-span-3 m-6  w-fit mx-auto outline-offset-8 rounded-full outline outline-8 outline-orange-400 ">
          <img
            src={user?.photoURL}
            className="rounded-full w-56 h-56 object-cover object-center "
            alt="profile picture"
          />
        </div>
        <div className="col-span-4">
          <div className="mt-8">
            <h2 className="font-bold text-2xl tracking-wide">
              Name:{user?.displayName}
            </h2>
          </div>
          <p className=" text-2xl font-semibold mt-2.5">Email: {user?.email}</p>
          <p className=" text-2xl font-semibold mt-2.5">Phone: 01xxxxxxxxxx</p>
          <p className=" text-xl font-semibold mt-2.5">
            1/02 street,Agarwal Road <br></br>
            Dhaka,Bangladesh
          </p>
        </div>
        <div>
          <div className="relative">
            {userCheck?.catagory ? (
              <>
                <img
                  className="rounded-full "
                  src="https://t4.ftcdn.net/jpg/03/50/11/83/360_F_350118359_fs2GIXzHjBhStQtRXq4yI927EcSxfS9A.jpg"
                  alt=""
                />
              </>
            ) : (
              "Silver Users"
            )}
          </div>
        </div>
      </div>
      <hr className="md:my-12 my-6"></hr>
    </div>
  );
};

export default Profile;
