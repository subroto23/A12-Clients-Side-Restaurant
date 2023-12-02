import { useState } from "react";
import HelmetHookes from "../../Hookes/ReactHelmet/Helmet";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import UseAuth from "../../Hookes/AuthUser/UseAuth";
import axios from "axios";
import UseAxiosSecure from "../../Hookes/AxiosPrivate/UseAxiosSecure";
import Swal from "sweetalert2";
import UseSectionTitle from "../../Hookes/SectionTitle/UseSectionTitle";

const Addmeal = () => {
  const [loader, setLoader] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const [Ingredients, setIngredients] = useState("");
  const [details, setDetails] = useState("");
  const { user } = UseAuth();
  const { handleSubmit, register, setValue, reset } = useForm();
  const axiosSecureUrl = UseAxiosSecure();
  const SectionTitle = UseSectionTitle("Post Your", "Meal");
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

  //Image Hosting
  const imageHostingApi = import.meta.env.VITE_IMAGE_HOSTING_API_KEY;
  const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageHostingApi}`;

  //Events Handler
  const onSubmit = async (data) => {
    const date = new Date();
    const { price, rating, title, type, image } = data;
    const imageFile = { image: image[0] };
    const res = await axios.post(imageHostingUrl, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    //Creating Object
    const addMealsFormValue = {
      title,
      type,
      imageUrl: res?.data?.data?.display_url,
      Ingredients,
      details,
      price,
      rating,
      createdDate: date,
      likes: [],
      reviews: 0,
      distributor: user?.displayName,
      email: user?.email,
    };
    if (data.button === "meals") {
      setLoader(true);
      await axiosSecureUrl
        .post(`/api/meals/meal/create?email=${user?.email}`, addMealsFormValue)
        .then((res) => {
          if (res.data.insertedId) {
            reset();
            setLoader(false);
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user?.displayName} Successfully Post Your Data`,
              showConfirmButton: false,
              timer: 1500,
            });
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
    } else if (data.button === "upcomming") {
      setLoader2(true);
      await axiosSecureUrl
        .post(
          `/api/upcomming/meal/create?email=${user?.email}`,
          addMealsFormValue
        )
        .then((res) => {
          if (res.data.insertedId) {
            reset();
            setLoader2(false);
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user?.displayName} Successfully Post Your Data`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: "Your Request Failed.Please try again later",
          });
          setLoader2(false);
        });
    }
  };

  return (
    <div>
      <HelmetHookes title={"Add Meal | pages"}></HelmetHookes>
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
                  defaultValue="default"
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
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  placeholder="Enter Meal rating  0 to 5"
                  min={0}
                  max={5}
                />
              </div>

              {/* Meal Image */}
              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="mealImage"
                >
                  Meal Image
                </label>
                <input
                  name="image"
                  type="file"
                  {...register("image", { required: true })}
                  className="block w-full file-input px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>

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
                    value={Ingredients}
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
                    value={details}
                    onChange={setDetails}
                    className="h-28 mt-2 mb-6 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-x-8 mt-6">
              <button
                type="button"
                onClick={() => {
                  setValue("button", "meals");
                  handleSubmit(onSubmit)();
                }}
                className="btn bg-orange-400 text-white hover:text-black  btn-toggle-style focus:outline-none focus:bg-gray-600 text-center flex"
              >
                {loader && (
                  <span className="loading loading-spinner loading-md mr-2"></span>
                )}
                {loader ? "Sending" : "Add Meal"}
              </button>

              {/* Upcomming Button */}
              <button
                type="button"
                onClick={() => {
                  setValue("button", "upcomming");
                  handleSubmit(onSubmit)();
                }}
                className="btn bg-orange-400 text-white hover:text-black mb-4 btn-toggle-style focus:outline-none focus:bg-gray-600 text-center flex"
              >
                {loader2 && (
                  <span className="loading loading-spinner loading-md mr-2"></span>
                )}
                {loader2 ? "Sending" : "UpComming"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Addmeal;
