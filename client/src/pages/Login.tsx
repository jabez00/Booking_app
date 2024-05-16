import axios from "axios";
import { FormEvent, useState, useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../UserContext";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [notification, setNotification] = useState(0);
  const { setUser } = useContext(userContext);
  async function loginUser(event: FormEvent) {
    event.preventDefault();
    try {
      const { data } = await axios.post("/user/login", {
        email,
        pass,
      });
      setUser(data);
      //console.log(data);
      setTimeout(() => {
        navigate("/");
      }, 2000);
      setNotification(1);
    } catch (error) {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      setNotification(2);
    }
    setEmail("");
    setPass("");
  }
  return (
    <div className="rounded-full mb-12 bg-gradient-to-tr from-red-100 to-pink-100 py-16 flex flex-col max-w-[940px]  mx-auto items-center">
      <div
        className={`
          ${
            notification == 1 ? "opacity-100" : "opacity-0"
          } transition-opacity ease-in-out delay-150 duration-300 absolute top-8 right-8 py-2 px-4 bg-green-500/90 rounded-md text-white z-10`}
      >
        LogIn Successful!
      </div>
      <div
        className={`
          ${
            notification == 2 ? "opacity-100" : "opacity-0"
          } transition-opacity ease-in-out delay-150 duration-300 absolute top-8 right-8 py-2 px-4 bg-red-500/90 rounded-md text-white z-10`}
      >
        LogIn Failed!
      </div>
      <div className="pb-12">
        <CgProfile className="mb-2 flex mx-auto" size={40} />
        <div className="text-2xl font-bold">LogIn</div>
      </div>
      <form className="flex flex-col space-y-4" onSubmit={loginUser}>
        <input
          type="email"
          value={email}
          placeholder="Example@email.com"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          className="w-[250px] outline-none border border-slate-400 rounded-xl px-4 text-lg"
        />
        <input
          type="password"
          value={pass}
          placeholder="Password"
          onChange={(event) => {
            setPass(event.target.value);
          }}
          className="outline-none border border-slate-400 rounded-xl px-4 text-lg"
        />
        <div className="pb-4"></div>
        <button className="text-white w-[250px] bg-red-500 rounded-full px-4 py-1">
          LogIn
        </button>
      </form>
      <div className="flex space-x-4 pt-1 text-gray-800">
        <div>Don't have an account?</div>{" "}
        <Link to={"/user/signup"}>
          <div className="font-semibold underline hover:text-pink-500">
            SignUp
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Login;
