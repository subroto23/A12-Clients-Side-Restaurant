import { useLoaderData } from "react-router-dom";
import { IoIosStar } from "react-icons/io";
import { CiStar } from "react-icons/ci";
import UseAxiosSecure from "../../Hookes/AxiosPrivate/UseAxiosSecure";
import { useState } from "react";
import UseAuth from "../../Hookes/AuthUser/UseAuth";
import Swal from "sweetalert2";
import ReviewsItemsBased from "../ReviewsItemsBased/ReviewsItemsBased";
import HelmetHookes from "../../Hookes/ReactHelmet/Helmet";

const MealsDetails = () => {
  const loader = useLoaderData();
  const AxiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const [like, setLike] = useState("Like");
  const [loading, setLoading] = useState(false);
  //Rating Creating
  const StarRating = () => {
    const stars = Array.from({ length: loader.rating }, (_, index) => (
      <span key={index} className="md:text-2xl text-orange-500">
        <IoIosStar className="inline"></IoIosStar>
      </span>
    ));

    return <div>{stars}</div>;
  };
  const StopRating = () => {
    const stars = Array.from({ length: 5 - loader.rating }, (_, index) => (
      <span key={index} className="md:text-2xl text-orange-500">
        <CiStar className="inline"></CiStar>
      </span>
    ));

    return <div>{stars}</div>;
  };

  //Handle Like Counts
  const handleLikeCount = () => {
    AxiosSecure.patch(
      `/api/meals/like/count?id=${loader._id}&email=${user?.email}`,
      {
        likes: loader.likes + 1,
      }
    ).then((res) => {
      if (res.data.modifiedCount > 0) {
        setLike(`Loved`);
      }
    });
  };

  //Handle Reviews
  const handleReviews = (e) => {
    setLoading(true);
    e.preventDefault();
    const reviews = e.target.reviews.value;
    const postReviewsData = {
      mealId: loader._id,
      email: user.email,
      name: user.displayName,
      photoUrl: user.photoURL,
      reviews,
    };

    //Handle Reviews Count
    AxiosSecure.post(
      `/reviews/create?email=${user?.email}`,
      postReviewsData
    ).then(() => {
      AxiosSecure.patch(
        `/api/meals/reviews/count?id=${loader._id}&email=${user?.email}`,
        {
          reviews: loader.reviews + 1,
        }
      ).then((res) => {
        if (res.data.modifiedCount > 0) {
          setLoading(false);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Review Successfully Added",
            showConfirmButton: false,
            timer: 1500,
          });
          e.target.reset();
        }
      });
    });
  };

  return (
    <div>
      <HelmetHookes title={loader?.title}></HelmetHookes>
      <div className="flex md:flex-row flex-col md:gap-x-8">
        <div className="py-2 md:w-1/2">
          <div className="relative h-full">
            <img
              className="h-full w-full max-h-[400px] object-cover hover:border-2"
              src={loader?.imageUrl}
              alt=""
            />
            <div className="flex md:px-0 px-2 justify-evenly opacity-80 text-white w-full absolute bottom-0 bg-black py-6">
              <p className="text-sm">
                <span className="text-yellow-300 md:font-medium md:text-lg">
                  Distributor :{" "}
                </span>
                <span className="md:text-lg font-semibold">
                  {loader.distributor}
                </span>
              </p>
              <p className="text-sm">
                <span className="text-yellow-300 md:font-medium md:text-lg">
                  Post :
                </span>
                <span className="md:text-lg font-semibold">
                  {loader.createdDate.slice(0, 10)}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 my-4">
          <div className="flex flex-col md:space-y-3">
            <h1 className="md:text-3xl font-semibold text-orange-600">
              {loader.title}
            </h1>
            <div className="flex">
              <StarRating />
              <StopRating />
              <span className="md:text-2xl ml-4 font-semibold">
                ({loader.rating}.0)
              </span>
            </div>
            <div>
              <p className="md:text-3xl">
                Price :<span className="font-semibold">{loader.price} /=</span>
              </p>
            </div>
            <div className="text-xl leading-normal text-gray-400">
              <div
                className="text-justify"
                dangerouslySetInnerHTML={{ __html: loader.details }}
              ></div>
              <h1 className="font-bold my-1 text-orange-400 text-xl">
                Ingredients:
              </h1>
              <div
                className="text-gray-600 leading-normal"
                dangerouslySetInnerHTML={{ __html: loader.Ingredients }}
              ></div>
            </div>
          </div>
          <div className="w-full flex mt-3">
            <button
              onClick={handleLikeCount}
              className="px-4 border-r bg-orange-400 py-3 text-white hover:bg-gray-400 hover:text-black font-bold w-1/2"
            >
              {like}
            </button>
            <button
              className="px-4 border-r bg-orange-400 py-3 text-white hover:bg-gray-400 hover:text-black font-bold w-1/2"
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              Review
            </button>
            <dialog
              id="my_modal_5"
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <form onSubmit={handleReviews}>
                  <div className="w-full">
                    <label className="form-control w-full max-w-xs">
                      <span className="label-text text-lg mb-1 text-orange-400 font-bold">
                        Review
                      </span>
                      <textarea
                        name="reviews"
                        placeholder="Type here"
                        className="h-32 p-2 border-2 text-lg"
                      />
                    </label>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="py-3 w-1/3 bg-orange-400 text-white rounded-md mt-4"
                    >
                      {loading && (
                        <span className="loading loading-spinner text-accent"></span>
                      )}
                      Submit
                    </button>
                  </div>
                </form>

                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
            <button className="px-4 border-r bg-orange-400 py-3 text-white hover:bg-gray-400 hover:text-black font-bold w-1/2">
              Order
            </button>
          </div>
        </div>
      </div>
      <div className="my-6">
        <h1 className="text-4xl text-center text-orange-400 text md:mt-20 my-8 font-semibold">
          Our Clients Reviews
        </h1>
        <ReviewsItemsBased itemsId={loader._id} />
      </div>
    </div>
  );
};

export default MealsDetails;
