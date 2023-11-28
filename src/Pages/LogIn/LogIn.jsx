import { useForm } from "react-hook-form";
import HelmetHookes from "../../Hookes/ReactHelmet/Helmet";
import UseAuth from "../../Hookes/AuthUser/UseAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const LogIn = () => {
  const { handleLogin } = UseAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { email, password } = data;
    handleLogin(email, password)
      .then(() => {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully Logged In",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location?.state ? location.state : "/");
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Login Failed!",
          footer: "Please Try again",
        });
      });
  };
  return (
    <div>
      <HelmetHookes title={"Login| Pages"} />
      <div className="w-full mb-4 px-2">
        <form onSubmit={handleSubmit(onSubmit)}>
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

export default LogIn;
