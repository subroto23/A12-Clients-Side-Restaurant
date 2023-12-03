import { CiStar } from "react-icons/ci";
import { IoIosStar } from "react-icons/io";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { Link } from "react-router-dom";

const MealCard = ({ data }) => {
  const { title, imageUrl, rating, price, _id } = data;

  //Rating Calculations
  const StarRating = () => {
    const stars = Array.from({ length: rating }, (_, index) => (
      <span key={index} className="md:text-2xl text-orange-500">
        <IoIosStar className="inline"></IoIosStar>
      </span>
    ));

    return <div>{stars}</div>;
  };
  const StopRating = () => {
    const stars = Array.from({ length: 5 - rating }, (_, index) => (
      <span key={index} className="md:text-2xl text-orange-500">
        <CiStar className="inline"></CiStar>
      </span>
    ));

    return <div>{stars}</div>;
  };
  //Rating Calculation end
  return (
    <div
      key={data._id}
      className="card bg-base-100 shadow-xl hover:shadow-md hover:shadow-orange-400"
    >
      <figure>
        <img
          src={imageUrl}
          alt="Shoes"
          className="w-full md:h-44 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title font-bold text-justify">{title}</h2>
        <div className="flex">
          <StarRating />
          <StopRating />
          <span className="md:text-2xl ml-4 font-semibold">({rating}.0)</span>
        </div>
        <div className="flex items-center gap-x-2 text-red-600">
          <span className="text-gray-400">8% discount</span>
          <del className="text-gray-400">{Number(price) + 6}</del>
          <span className="text-2xl">
            <FaBangladeshiTakaSign />
          </span>
          <span className="text-2xl">{price}</span>
        </div>
        <div className="card-actions justify-end">
          <div className="badge badge-outline hover:bg-orange-400 hover:text-white">
            <button>
              <Link to={`/meals/details/meal/${_id}`}>Details</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
