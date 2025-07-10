import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        console.log(result);
        toast.success("Login successful!");
        navigate(from);
      })
      .catch((error) => {
        toast.error(error.message || "Login failed. Please try again.");
      });
  };

  return (
    <div className="card  w-full max-w-sm shrink-0 ">
      <div className="card-body">
        <h1 className="text-5xl font-bold">Please Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500">Email is required</p>}

            {/* Password */}
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="input"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}

            {/* Forgot */}
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>

            <button className="btn bg-[#CAEB66] text-black mt-4">Login</button>
          </fieldset>

          <p>
            Don’t Have An Account ?{" "}
            <Link state={{ from }} className="btn btn-link" to="/register">
              Register
            </Link>
          </p>
        </form>
        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
