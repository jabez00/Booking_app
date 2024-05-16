import axios from "axios";
import { FormEvent, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  async function signupUser(event: FormEvent) {
    event.preventDefault();
    try {
      await axios.post("/user/signup", {
        name,
        email,
        pass,
      });
      setTimeout(() => {
        navigate("/user/login");
      }, 2000);
      setNotification(1);
    } catch (err) {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      setNotification(2);
    }
    setName("");
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
        Registered Successfully!
      </div>
      <div
        className={`
        ${
          notification == 2 ? "opacity-100" : "opacity-0"
        } transition-opacity ease-in-out delay-150 duration-300 absolute top-8 right-8 py-2 px-4 bg-red-500/90 rounded-md text-white z-10`}
      >
        SignUp failed! Try again
      </div>
      <div className="pb-12">
        <CgProfile className="mb-2 flex mx-auto" size={40} />
        <div className="text-2xl font-bold">SignUp</div>
      </div>
      <form className="flex flex-col space-y-4" onSubmit={signupUser}>
        <input
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          placeholder="UserName"
          className="w-[250px] outline-none border border-slate-400 rounded-xl px-4 text-lg"
        />
        <input
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          placeholder="Example@email.com"
          className="w-[250px] outline-none border border-slate-400 rounded-xl px-4 text-lg"
        />
        <input
          type="password"
          value={pass}
          onChange={(event) => {
            setPass(event.target.value);
          }}
          placeholder="Password"
          className="outline-none border border-slate-400 rounded-xl px-4 text-lg"
        />
        <div className="pb-4"></div>
        <button className="text-white w-[250px] bg-red-500 rounded-full px-4 py-1">
          SignUp
        </button>
      </form>

      <div className="flex space-x-4 pt-1 text-gray-800">
        <div>Already have an account?</div>
        <Link to={"/user/login"}>
          <div className="font-semibold underline hover:text-pink-500">
            Login
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
