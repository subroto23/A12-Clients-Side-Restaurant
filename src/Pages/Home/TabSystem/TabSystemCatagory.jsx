import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import UseAllMeals from "../../../Hookes/AllMeals/UseAllMeals";
import MealCard from "./MealCard";
import UseSectionTitle from "../../../Hookes/SectionTitle/UseSectionTitle";
const TabSystemCatagory = () => {
  const [meals, loader, refetch] = UseAllMeals();
  const SectionTitle = UseSectionTitle("Popular", "Meals", "md:mt-28 md:mb-16");
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
      <div>
        <Tabs className="md:text-lg py-6 md:font-medium">
          <TabList className="text-center md:space-x-8 border-b">
            <Tab>All</Tab>
            <Tab>Breakfast</Tab>
            <Tab>Lunch</Tab>
            <Tab>Dinner</Tab>
          </TabList>
          <TabPanel>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-6 md:gap-8  md:mt-10 mt-6 p-4 ">
              {meals?.map((data) => (
                <MealCard key={data._id} data={data} />
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-6 md:gap-8  md:mt-10 mt-6 p-4 ">
              {meals
                ?.filter((data) => data.type === "Breakfast")
                .map((data) => (
                  <MealCard key={data._id} data={data} />
                ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-6 md:gap-8  md:mt-10 mt-6 p-4 ">
              {meals
                ?.filter((data) => data.type === "Lunch")
                .map((data) => (
                  <MealCard key={data._id} data={data} />
                ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-6 md:gap-8  md:mt-10 mt-6 p-4 ">
              {meals
                ?.filter((data) => data.type === "Dinner")
                .map((data) => (
                  <MealCard key={data._id} data={data} />
                ))}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default TabSystemCatagory;
