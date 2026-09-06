
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");

  const {
    token,
    setToken,
    navigate,
    backendUrl,
  } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandlar = async (event) => {
    event.preventDefault();

    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(
          backendUrl + "/api/user/register",
          {
            name,
            email,
            password,
          }
        );

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem(
            "token",
            response.data.token
          );
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(
          backendUrl + "/api/user/login",
          {
            email,
            password,
          }
        );

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem(
            "token",
            response.data.token
          );
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
        error.message
      );
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div>
      <form
        onSubmit={onSubmitHandlar}
        className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
      >

  

        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="prata-regular text-3xl">
            {currentState}
          </p>

          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>

     

        {currentState === "Login" ? null : (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Name"
            required
          />
        )}


        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Email"
          required
        />



        <div className="relative w-full">

          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type={showPassword ? "text" : "password"}
            className="w-full px-3 py-2 pr-12 border border-gray-800"
            placeholder="Password"
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition"
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
          >
            {showPassword ? (
              <EyeOff size={19} strokeWidth={1.8} />
            ) : (
              <Eye size={19} strokeWidth={1.8} />
            )}
          </button>

        </div>

     

        <div className="w-full flex justify-between text-sm mt-[-8px]">

          {currentState === "Login" ? (
            <p
              onClick={() => {
                setCurrentState("Sign Up");
                setShowPassword(false);
              }}
              className="cursor-pointer"
            >
              Create account
            </p>
          ) : (
            <p
              onClick={() => {
                setCurrentState("Login");
                setShowPassword(false);
              }}
              className="cursor-pointer"
            >
              Login Here
            </p>
          )}

        </div>


        <button className="bg-black text-white font-light px-8 py-2 mt-4">
          {currentState === "Login"
            ? "Sign In"
            : "Sign Up"}
        </button>

      </form>
    </div>
  );
};

export default Login;
