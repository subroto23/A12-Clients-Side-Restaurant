import UseAllMeals from "../../Hookes/AllMeals/UseAllMeals";
import UseSectionTitle from "../../Hookes/SectionTitle/UseSectionTitle";
import MealCard from "../Home/TabSystem/MealCard";
//
const MealsPages = () => {
  const [meals, loader, refetch] = UseAllMeals();
  const SectionTitle = UseSectionTitle(
    "Our Recent",
    "Meals",
    "md:mt-28 md:mb-16"
  );

  //
  if (loader) {
    return (
      <div className="border-gray-300 h-20 w-20 my-24 mx-auto animate-spin rounded-full border-8 border-t-green-600" />
    );
  }
  refetch();
  return (
    <div className="md:my-16 my-8 max-w-7xl mx-auto">
      {SectionTitle}
      {/* Tab Style Start */}
      <div className="grid md:grid-cols-3 grid-cols-1 md:gap-10 gap-8">
        {meals?.map((data) => (
          <MealCard key={data._id} data={data} />
        ))}
      </div>
    </div>
  );
};

export default MealsPages;
