import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const { loginWithEmail } = useAuth();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const loginInfo = {
      email,
      password,
    };

    const res = await loginWithEmail(loginInfo);
    console.log(res);
    if (res.success === true) {
      toast.success("Login Successful");
      navigate("/dashboard");
    } else {
      toast.error(res.response.data.message);
    }
  };

  return (
    <div>
      <h3 className="text-2xl mt-10 text-center">Welcome Back</h3>
      <form
        onSubmit={handleLogin}
        className="flex flex-col justify-center w-[80%] md:w-[70%] lg:w-[40%] mx-auto lg:p-10"
      >
        <label htmlFor="email">Email:</label>
        <input
          required
          className="bg-fill p-2 focus:bg-fill ring-0 focus:border-fill rounded-md"
          type="text"
          name="email"
          id="email"
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          required
          className="bg-fill p-2 focus:bg-fill ring-0 focus:border-fill rounded-md"
          type="password"
          name="password"
          id="password"
        />

        <br />
        <button
          className="bg-fill p-2 w-full rounded-md hover:bg-primary text-primary hover:text-white"
          type="submit"
        >
          Login
        </button>
      </form>
      <p className="text-center">
        New Here ?{" "}
        <Link className="text-primary" to={"/register"}>
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
