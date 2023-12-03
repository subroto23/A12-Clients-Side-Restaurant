import { GiCoffeeCup } from "react-icons/gi";
import { IoWine } from "react-icons/io5";
import { FaBowlRice } from "react-icons/fa6";
const Specialiest = () => {
  return (
    <div className="my-16">
      <div className="grid md:grid-cols-4 grid-cols-1 md:gap-x-12 gap-6">
        {/* Items - 1 */}
        <div className="flex flex-col justify-center group items-center py-6">
          <div className="w-24 h-24 rounded-full flex justify-center items-center group-hover:bg-slate-800 group-hover:outline-slate-800 duration-300 ease-in transform bg-orange-400 border-4 outline-4 outline outline-orange-400">
            <span className="text-4xl text-white">
              <FaBowlRice />
            </span>
          </div>
          <div className="text-center space-y-4">
            <h1 className="font-bold text-2xl mt-4 group-hover:text-orange-400">
              Dinner Dishes
            </h1>
            <p>
              Include options like Dhaka Biriyani, Kacchi Biriyani, and Morog
              Polao.
            </p>
          </div>
        </div>
        {/* Items - 2*/}
        <div className="flex flex-col justify-center group items-center py-6">
          <div className="w-24 h-24 rounded-full flex justify-center items-center group-hover:bg-slate-800 group-hover:outline-slate-800 duration-300 ease-in transform bg-orange-400 border-4 outline-4 outline outline-orange-400">
            <span className="text-4xl text-white">
              <GiCoffeeCup />
            </span>
          </div>
          <div className="text-center space-y-4">
            <h1 className="font-bold text-2xl mt-4 group-hover:text-orange-400">
              Breakfast
            </h1>
            <p>
              Include a variety of teas, such as cha (spiced tea) or traditional
              sweets with morning tea.
            </p>
          </div>
        </div>
        {/* Items - 3 */}
        <div className="flex flex-col justify-center group items-center py-6">
          <div className="w-24 h-24 rounded-full flex justify-center items-center group-hover:bg-slate-800 group-hover:outline-slate-800 duration-300 ease-in transform bg-orange-400 border-4 outline-4 outline outline-orange-400">
            <span className="text-4xl text-white">
              <IoWine />
            </span>
          </div>
          <div className="text-center space-y-4">
            <h1 className="font-bold text-2xl mt-4 group-hover:text-orange-400">
              Lunch Dishes
            </h1>
            <p>
              A range of vegetarian lunch options, considering the preferences
              of a diverse audience.
            </p>
          </div>
        </div>
        {/* Items - 4 */}
        <div className="flex flex-col justify-center group items-center py-6">
          <div className="w-24 h-24 rounded-full flex justify-center items-center group-hover:bg-slate-800 group-hover:outline-slate-800 duration-300 ease-in transform bg-orange-400 border-4 outline-4 outline outline-orange-400">
            <span className="text-4xl text-white">
              <GiCoffeeCup />
            </span>
          </div>
          <div className="text-center space-y-4">
            <h1 className="font-bold text-2xl mt-4 group-hover:text-orange-400">
              Fast Food
            </h1>
            <p>
              Include popular snack items such as fries, onion rings, mozzarella
              sticks, and chicken wings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Specialiest;
