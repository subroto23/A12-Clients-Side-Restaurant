import Swal from "sweetalert2";
import UseAuth from "../../Hookes/AuthUser/UseAuth";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const { handleGLogin } = UseAuth();
  const navigate = useNavigate();

  //Google LogIn Handeler
  const handleGoogleUsers = async () => {
    await handleGLogin().then(async () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully LogIn",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(location?.state ? location.state : "/");
    });
  };
  return (
    <>
      <button
        onClick={handleGoogleUsers}
        className="mb-2.5 btn-gradent-swipe-l2r flex items-center text-sm md:text-lg  py-3 px-7 rounded-md hover:bg-orange-400 hover:text-white font-semibold uppercase tracking-wider text-orange-400 border md:w-1/2"
      >
        <svg
          role="img"
          className="flex-shrink-0 w-5 h-5 mr-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
        </svg>
        <span className="relative z-10 flex justify-center items-center">
          LogIn With Google
        </span>
      </button>
    </>
  );
};

export default GoogleLogin;
