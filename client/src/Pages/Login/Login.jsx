import useAuth from "../../Hooks/useAuth";

const Login = () => {
  const { loginWithEmail } = useAuth();

  const handleLogin = async () => {
    const email = "alcahammad@gmail.com";
    const password = "ahammad";

    const res = await loginWithEmail(email, password);
    console.log(res);
  };
  return (
    <div>
      <h3>Login Page</h3>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
