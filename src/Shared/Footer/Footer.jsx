import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";
const Footer = () => {
  const years = new Date().getFullYear();
  return (
    <footer className="body-font bg-[#071e34]">
      <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <Link className="flex title-font font-bold items-center md:justify-start justify-center text-white">
            <img
              className="h-6 w-6 mr-2"
              src="https://image.similarpng.com/very-thumbnail/2020/06/Restaurant-logo-with-chef-drawing-template-on-transparent-background-PNG.png"
              alt=""
            />
            <span className="text-xl">
              <span className="text-green-600">IU</span>meal
            </span>
          </Link>
          <p className="mt-2 text-sm text-white">
            Taste the World, Right at Your Fingertips
          </p>
        </div>
        <div className="flex-grow flex flex-wrap justify-between md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-bold text-white tracking-widest text-lg mb-3">
              Category
            </h2>
            <hr />
            <nav className="list-none mb-10 mt-6 space-y-2 font-semibold">
              <li>
                <Link className="text-white flex items-center hover:text-orange-500">
                  <span className="text-sm mr-2">
                    <FaAngleRight />
                  </span>{" "}
                  Breakfast
                </Link>
              </li>
              <li>
                <Link className="text-white flex items-center hover:text-orange-500">
                  <span className="text-sm mr-2">
                    <FaAngleRight />
                  </span>{" "}
                  Lunch
                </Link>
              </li>
              <li>
                <Link className="text-white flex items-center hover:text-orange-500">
                  <span className="text-sm mr-2">
                    <FaAngleRight />
                  </span>{" "}
                  Dinner
                </Link>
              </li>
              <li>
                <Link className="text-white flex items-center hover:text-orange-500">
                  <span className="text-sm mr-2">
                    <FaAngleRight />
                  </span>{" "}
                  Fast Food
                </Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-bold text-white tracking-widest text-lg mb-3">
              Quick Links
            </h2>
            <hr />
            <nav className="list-none mb-10 mt-6 space-y-2 font-semibold">
              <li>
                <Link className="text-white flex items-center hover:text-orange-500">
                  <span className="text-sm mr-2">
                    <FaAngleRight />
                  </span>{" "}
                  Home
                </Link>
              </li>
              <li>
                <Link className="text-white flex items-center hover:text-orange-500">
                  <span className="text-sm mr-2">
                    <FaAngleRight />
                  </span>{" "}
                  Meals
                </Link>
              </li>
              <li>
                <Link className="text-white flex items-center hover:text-orange-500">
                  <span className="text-sm mr-2">
                    <FaAngleRight />
                  </span>{" "}
                  Upcomming
                </Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-bold text-white tracking-widest text-lg mb-3">
              Find Us
            </h2>
            <hr />
            <nav className="list-none mb-10 mt-6 space-y-2 font-semibold">
              <li>
                <Link className="text-white flex items-center hover:text-orange-500">
                  <span className="text-sm mr-2">
                    <FaLocationDot />
                  </span>{" "}
                  Islamic University, Kustia
                </Link>
              </li>
              <li>
                <Link className="text-white flex items-center hover:text-orange-500">
                  <span className="text-sm mr-2">
                    <FaPhone />
                  </span>{" "}
                  +880 176 234 233
                </Link>
              </li>
              <li>
                <Link className="text-white flex items-center hover:text-orange-500">
                  <span className="text-sm mr-2">
                    <MdOutlineAlternateEmail />
                  </span>{" "}
                  iumeals@gmail.com
                </Link>
              </li>
            </nav>
          </div>
        </div>
      </div>
      <div className="bg-[#071e48]">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-white text-sm text-center sm:text-left">
            Copyright © {years} <span className="text-green-600">IU</span>
            meal.All rights Reserved
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            <Link className="text-white">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </Link>
            <Link className="ml-3 text-white">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </Link>
            <Link className="ml-3 text-white">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </Link>
            <Link className="ml-3 text-white">
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                ></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
