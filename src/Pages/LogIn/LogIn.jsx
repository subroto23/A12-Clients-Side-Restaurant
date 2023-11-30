import { useForm } from "react-hook-form";
import HelmetHookes from "../../Hookes/ReactHelmet/Helmet";
import UseAuth from "../../Hookes/AuthUser/UseAuth";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { useEffect, useState } from "react";
import GoogleLogin from "../../Components/GoogleLogin/GoogleLogin";
const LogIn = () => {
  const [btnDisable, setBtnDisabled] = useState(true);
  const [captchaMessage, setCaptchMessage] = useState(null);
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
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  //Validate Reload Captcha
  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setCaptchMessage(null);
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
      setCaptchMessage("Captcha not Matched");
    }
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

          {/* Recapth Section */}
          <div className="form-control mb-4">
            <LoadCanvasTemplate />
          </div>

          {/* Email Section */}
          <div className="form-control mb-4">
            <input
              type="recaptcha"
              placeholder="Type the captcha above"
              className="input input-bordered w-full"
              onBlur={handleValidateCaptcha}
              required
            />
            {captchaMessage && (
              <p className="text-sm my-1 ml-2 text-red-600">{captchaMessage}</p>
            )}
          </div>

          <div className="w-1/2 mx-auto">
            <button
              type="submit"
              disabled={btnDisable}
              className="btn btn-gost w-full"
            >
              Join Us
            </button>
          </div>
        </form>
        {/* Or Log In */}
        <div className="flex items-center justify-center text-xl my-6">
          <span className="w-full mr-4 h-px bg-gray-300" />
          or
          <span className="w-full ml-4 h-px bg-gray-300" />
        </div>
        <div className="mb-12 flex md:justify-evenly md:flex-row flex-col">
          <GoogleLogin />
          <button className="text-grey-dark">
            Don’t Have Account ?
            <Link
              to="/signup"
              className="text-green-500 hover:font-bold font-medium text-lg mx-2"
            >
              Register
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
