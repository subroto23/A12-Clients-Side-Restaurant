import { useForm } from "react-hook-form";
import HelmetHookes from "../../Hookes/ReactHelmet/Helmet";
import UseAuth from "../../Hookes/AuthUser/UseAuth";
import Swal from "sweetalert2";

const SignUp = () => {
  const { handleCreateUser, handleUpdateUser, user } = UseAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { email, password, name, photoUrl } = data;
    handleCreateUser(email, password)
      .then(() => {
        handleUpdateUser(name, photoUrl).then(() => {
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.displayName},Your Account Created Successfully`,
            showConfirmButton: false,
            timer: 1500,
          });
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: "Please Try again another email",
        });
      });
  };
  return (
    <div>
      <HelmetHookes title={"SignUp | Pages"} />
      <div className="w-full mb-4 px-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Section */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">
                Name <span className="text-red-600">*</span>
              </span>
            </label>
            <input
              type="text"
              placeholder="Name"
              {...register("name", {
                required: "Name FIeld Required",
                minLength: {
                  value: 3,
                  message: "Name at least 3 characters long ",
                },
                maxLength: {
                  value: 20,
                  message: "Name exceed maxLength.",
                },
              })}
              className="input input-bordered w-full"
            />
            {errors?.name?.message && (
              <p className="text-sm my-1 ml-2 text-red-600">
                {errors?.name?.message}
              </p>
            )}
          </div>
          {/* Email Section */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">
                Email <span className="text-red-600">*</span>
              </span>
            </label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="input input-bordered w-full"
              {...register("email", {
                required: "Email FIeld is Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors?.email?.message && (
              <p className="text-sm my-1 ml-2 text-red-600">
                {errors?.email?.message}
              </p>
            )}
          </div>
          {/* password Section */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">
                Password <span className="text-red-600">*</span>
              </span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 20,
                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
              })}
            />
            {errors.password?.type === "required" && (
              <p className="text-sm my-1 ml-2 text-red-600">
                Password is required
              </p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-sm my-1 ml-2 text-red-600">
                Password must be 6 characters
              </p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="text-sm my-1 ml-2 text-red-600">
                Password must be less than 20 characters
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-sm my-1 ml-2 text-red-600">
                Password must have one Uppercase one lower case, one number and
                one special character.
              </p>
            )}
          </div>
          {/* Photo Url Section */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">
                PhotoUrl <span className="text-red-600">*</span>
              </span>
            </label>
            <input
              type="text"
              placeholder="https://your photo.com"
              className="input input-bordered w-full"
              {...register("photoUrl", {
                required: "Photo Url is Required",
              })}
            />
            {errors?.photoUrl?.message && (
              <p className="text-sm my-1 ml-2 text-red-600">
                {errors?.photoUrl?.message}
              </p>
            )}
          </div>
          <div className="w-1/2 mx-auto">
            <button type="submit" className="btn btn-gost w-full">
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
