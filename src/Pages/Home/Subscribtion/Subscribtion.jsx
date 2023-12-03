import UseSectionTitle from "../../../Hookes/SectionTitle/UseSectionTitle";
import { TbCurrencyTaka } from "react-icons/tb";
const Subscribtion = () => {
  const SectionTitle = UseSectionTitle("Upgrade", "Premium", "md:mt-28");
  const handlePremiumBtn = (data) => {
    console.log(data);
  };
  return (
    <div>
      {SectionTitle}
      <div className="flex flex-col items-center justify-center md:mb-24 text-gray-700 ">
        <div className="flex flex-wrap items-center justify-center w-full max-w-4xl">
          <div className="flex flex-col flex-grow mt-8 overflow-hidden bg-white rounded-lg shadow-lg">
            <div className="flex flex-col items-center p-10 bg-orange-400">
              <span className="font-semibold text-2xl">Silver</span>
              <div className="flex items-center">
                <span className="text-3xl">
                  <TbCurrencyTaka />
                </span>
                <span className="text-5xl font-bold">2200</span>
                <span className="text-2xl text-gray-500">/mo</span>
              </div>
            </div>
            <div className="px-10 py-16">
              <ul>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-600 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-2">Priority Order Processing</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-600 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-2">Early Access Foods</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-600 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-2">Exclusive Discounts</span>
                </li>
              </ul>
            </div>
            <div className="flex px-10 pb-10 justfy-center">
              <button
                onClick={() => handlePremiumBtn("Silver")}
                className="flex items-center justify-center w-full h-12 px-6 text-sm uppercase bg-gradient-to-l from-orange-500 to-orange-700 hover:bg-gredient-to-r hover:bg-orange-800 hover:to-orange-500 hover:font-bold text-white rounded-lg"
              >
                Buy now
              </button>
            </div>
          </div>

          <div className="z-10 flex flex-col flex-grow mt-8 overflow-hidden transform bg-white rounded-lg shadow-lg md:scale-110">
            <div className="flex flex-col items-center px-10 py-16 bg-orange-400">
              <span className="font-semibold text-2xl">Platinum</span>
              <div className="flex items-center">
                <span className="text-3xl">
                  <TbCurrencyTaka />
                </span>
                <span className="text-6xl font-bold">3200</span>
                <span className="text-2xl text-gray-500">/mo</span>
              </div>
            </div>
            <div className="p-10">
              <ul>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-600 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-2 italic">Free Delivery</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-600 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-2">Scheduled Orders</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-600 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-2">Group Ordering</span>
                </li>
              </ul>
            </div>
            <div className="flex px-10 pb-10 justfy-center">
              <button
                onClick={() => handlePremiumBtn("Platinum")}
                className="flex items-center justify-center w-full h-12 px-6 text-sm uppercase bg-gradient-to-l from-orange-500 to-orange-700 hover:bg-gredient-to-r hover:bg-orange-800 hover:to-orange-500 hover:font-bold text-white rounded-lg"
              >
                Buy now
              </button>
            </div>
          </div>

          <div className="flex flex-col flex-grow overflow-hidden bg-white rounded-lg shadow-lg mt-19">
            <div className="flex flex-col items-center px-10 py-16 bg-orange-400">
              <span className="font-semibold text-2xl">Gold</span>
              <div className="flex items-center">
                <span className="text-3xl">
                  <TbCurrencyTaka />
                </span>
                <span className="text-5xl font-bold">2600</span>
                <span className="text-2xl text-gray-500">/mo</span>
              </div>
            </div>
            <div className="p-10">
              <ul>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-600 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-2 italic">Exclusive Menu Items</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-600 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-2">Free Delivery</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-600 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-2">Early Access Foods</span>
                </li>
              </ul>
            </div>
            <div className="flex px-10 pb-10 justfy-center">
              <button
                onClick={() => handlePremiumBtn("Gold")}
                className="flex items-center justify-center w-full h-12 px-6 text-sm uppercase bg-gradient-to-l from-orange-500 to-orange-700 hover:bg-gredient-to-r hover:bg-orange-800 hover:to-orange-500 hover:font-bold text-white rounded-lg"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribtion;
