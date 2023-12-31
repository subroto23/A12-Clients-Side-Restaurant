import { useState } from "react";
import HelmetHookes from "../../Hookes/ReactHelmet/Helmet";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import UseAuth from "../../Hookes/AuthUser/UseAuth";
// import axios from "axios";
import UseAxiosSecure from "../../Hookes/AxiosPrivate/UseAxiosSecure";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router-dom";
import UseSectionTitle from "../../Hookes/SectionTitle/UseSectionTitle";

const UpdateMeals = () => {
  const [loader, setLoader] = useState(false);
  const [Ingredients, setIngredients] = useState("");
  const [details, setDetails] = useState("");
  const { user } = UseAuth();
  const { handleSubmit, register, reset } = useForm();
  const axiosSecureUrl = UseAxiosSecure();
  const SectionTitle = UseSectionTitle("Update", "Meals");

  const payloader = useLoaderData();
  //Customize Toolbar
  const toolbarOptions = [
    { list: "ordered" },
    { list: "bullet" },
    { color: [] },
    {
      bold: true,
    },
  ];
  const module = {
    toolbar: toolbarOptions,
  };

  //Events Handler
  const onSubmit = async (data) => {
    setLoader(true);
    const { price, rating, title, type } = data;
    const addMealsFormValue = {
      title,
      type,
      Ingredients,
      details,
      price,
      rating,
    };
    await axiosSecureUrl
      .put(
        `/api/meals/update/${payloader._id}?email=${user?.email}`,
        addMealsFormValue
      )
      .then((res) => {
        if (res.data) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Successfully Updated Your Data`,
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
          setLoader(false);
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: "Your Request Failed.Please try again later",
        });
        setLoader(false);
      });
  };
  return (
    <div>
      <HelmetHookes title={"Update Meal | pages"}></HelmetHookes>
      {SectionTitle}
      <section className="max-w-4xl p-6 mx-auto bg-white rounded-md dark:bg-gray-800">
        <div className="my-8 mx-auto max-w-6xl border-2 md:p-8 shadow-xl border-orange-400">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 md:px-2 px-4 py-4 gap-8 space-y-4 ">
              {/* Meal Type */}
              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="name"
                >
                  Meal Type
                </label>
                <select
                  defaultValue={payloader.type}
                  {...register("type", { required: true })}
                  className="select select-bordered block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                >
                  <option value="default" disabled>
                    Choose Meal Type
                  </option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                </select>
              </div>

              {/* Meal title*/}
              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="mealtitle"
                >
                  Meal Title
                </label>
                <input
                  {...register("title", {
                    required: true,
                  })}
                  type="text"
                  defaultValue={payloader?.title}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  placeholder="Enter Meal Name"
                />
              </div>

              {/* Meal Price*/}
              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="mealprice"
                >
                  Meal price
                </label>
                <input
                  {...register("price", { required: true })}
                  type="number"
                  defaultValue={payloader?.price}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  placeholder="Enter Meal Price"
                />
              </div>

              {/* Meal Rating*/}
              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="rating"
                >
                  Meal Rating
                </label>
                <input
                  type="number"
                  {...register("rating", {
                    required: true,
                  })}
                  defaultValue={payloader?.rating}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  placeholder="Enter Meal rating  0 to 5"
                  min={0}
                  max={5}
                />
              </div>

              {/* Meal Image */}
              {/* <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="mealImage"
                >
                  Meal Image
                </label>
                <input
                  name="image"
                  type="file"
                  {...register("image")}
                  className="block w-full file-input px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div> */}

              {/* Ingredient Section */}
              <div className="md:col-span-2">
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="passwordConfirmation"
                >
                  Ingredient
                </label>
                <div>
                  <ReactQuill
                    theme="snow"
                    modules={module}
                    name=" Ingredient"
                    value={Ingredients || payloader.Ingredients}
                    onChange={setIngredients}
                    className="h-28 mt-2 mb-6 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>
              </div>

              {/* Details Section */}
              <div className="md:col-span-2">
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="passwordConfirmation"
                >
                  Description
                </label>
                <div>
                  <ReactQuill
                    name="details"
                    theme="snow"
                    modules={module}
                    value={details || payloader.details}
                    onChange={setDetails}
                    className="h-28 mt-2 mb-6 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-x-8 mt-6">
              <button
                type="submit"
                className="p-4 bg-orange-400 rounded-md text-white hover:bg-gray-200 hover:text-black btn-toggle-style focus:outline-none focus:bg-gray-600 text-center flex"
              >
                {loader && (
                  <span className="loading loading-spinner loading-md mr-2"></span>
                )}
                {loader ? "Sending" : "Update Meal"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default UpdateMeals;
