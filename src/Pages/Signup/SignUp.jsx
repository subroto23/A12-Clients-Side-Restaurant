import { useForm } from "react-hook-form";
import HelmetHookes from "../../Hookes/ReactHelmet/Helmet";
import UseAuth from "../../Hookes/AuthUser/UseAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { handleCreateUser, handleUpdateUser, handleLogOut, handleGLogin } =
    UseAuth();
  const navigate = useNavigate();
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
          Swal.fire(`Account Created Successfully,Please Log In First`);
          reset();
          handleLogOut();
          navigate("/login");
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
  const handleGoogleLogin = () => {
    handleGLogin();
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
        {/* Or Log In */}
        <div className="flex items-center justify-center text-xl my-6">
          <span className="w-full mr-4 h-px bg-gray-300" />
          or
          <span className="w-full ml-4 h-px bg-gray-300" />
        </div>
        <div className="mb-12" onClick={handleGoogleLogin}>
          <button className="mb-2.5 btn-gradent-swipe-l2r py-3 px-7 rounded-md  font-semibold uppercase tracking-wider text-green-500 border w-full">
            <span className="relative z-10 flex justify-center items-center">
              <svg
                role="img"
                className="flex-shrink-0 w-5 h-5 mr-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
              </svg>
              Login with Google
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
