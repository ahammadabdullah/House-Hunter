import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";

const Register = () => {
  const { registerWithEmail } = useAuth();
  const navigate = useNavigate();
  const regex = /^(013|014|015|016|017|018|019)\d{8}$/;
  const handleRegistration = async (e) => {
    e.preventDefault();
    const form = e.target;
    const number = form.number.value;
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;
    const name = form.name.value;
    const isValid = regex.test(number);
    const userData = {
      name,
      email,
      password,
      number,
      role,
    };
    if (!isValid) {
      toast.error("Provide a valid Bangladeshi Number");

      return;
    }

    const res = await registerWithEmail(userData);
    if (res.success === true) {
      toast.success("Registration Successful");
      navigate("/dashboard");
    } else {
      toast.error(res.response.data.message);
    }
    // closeAddModal();
    console.log(res);
  };

  return (
    <div>
      <h3 className="text-2xl mt-10 text-center">Welcome to House Hunter</h3>
      <form
        onSubmit={handleRegistration}
        className="flex flex-col justify-center w-[80%] md:w-[70%] lg:w-[40%] mx-auto lg:p-10"
      >
        <label htmlFor="name">Name:</label>
        <input
          required
          className="bg-fill p-2 focus:bg-fill ring-0 focus:border-fill"
          type="text"
          name="name"
          id="name"
        />
        <br />
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
        <label htmlFor="number">Mobile:</label>
        <input
          required
          className="bg-fill p-2 focus:bg-fill ring-0 focus:border-fill rounded-md"
          type="tel"
          name="number"
          id="number"
        />
        <br />
        <label htmlFor="role">Role:</label>
        <select
          required
          className="bg-fill p-2 focus:bg-fill ring-0 focus:border-fill rounded-md"
          name="role"
          id="role"
        >
          <option disabled>Select Role</option>
          <option value="owner">House Owner</option>
          <option value="renter">House Renter</option>
        </select>
        <br />
        <button
          className="bg-fill p-2 w-full rounded-md hover:bg-primary text-primary hover:text-white"
          type="submit"
        >
          Register
        </button>
      </form>

      <p className="text-center">
        Already have an account ?{" "}
        <Link className="text-primary" to={"/login"}>
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
