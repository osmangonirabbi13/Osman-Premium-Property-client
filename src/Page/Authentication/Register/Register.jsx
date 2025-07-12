import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAxios from "../../../Hooks/useAxios";
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useAuth();
  const [profilePic, setProfilePic] = useState("");
  const axiosInstance = useAxios();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then(async (result) => {
        console.log(result);
        // update userinfo in the database

        const userInfo = {
          displayName: data.name,
          email: data.email,
          role: "user",
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };
        const userRes = await axiosInstance.post("/users", userInfo);
        console.log(userRes.data);
        // update user profile in firebase
        const userProfile = {
          displayName: data.name,
          photoURL: profilePic,
        };
        updateUserProfile(userProfile)
          .then(() => {
            toast.success("Registration successful!");
            navigate(from);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    const uploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;

    try {
      const res = await axios.post(uploadUrl, formData);
      setProfilePic(res.data.data.url);
      console.log("Image uploaded:", res.data.data.url);
    } catch (error) {
      console.error(
        "Image upload failed:",
        error.response?.data || error.message
      );
      toast.error("Image upload failed.");
    }
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0">
      <div className="card-body">
        <h1 className="text-4xl font-bold">Create Account</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            {/* Name Field */}
            <label className="label">Your Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input"
              placeholder="Your Name"
            />
            {errors.name && <p className="text-red-500">Name is required</p>}

            {/* Photo Upload */}
            <label className="label">Upload Your Photo</label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="file-input file-input-neutral"
            />

            {/* Email Field */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500">Email is required</p>}

            {/* Password Field */}
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                validate: {
                  hasUpperCase: (value) =>
                    /[A-Z]/.test(value) ||
                    "Must include at least one uppercase letter",
                  hasLowerCase: (value) =>
                    /[a-z]/.test(value) ||
                    "Must include at least one lowercase letter",
                },
              })}
              className="input"
              placeholder="Password"
            />

            {/* Error Message Section */}
            {errors.password && (
              <p className="text-red-500 mt-1">{errors.password.message}</p>
            )}

            <button className="btn bg-[#CAEB66] text-black mt-4">
              Register
            </button>
          </fieldset>

          <p className="mt-2">
            <small className="text-lg">
              Already have an account?{" "}
              <Link className="text-red-500 underline" to="/login">
                Login
              </Link>
            </small>
          </p>
        </form>
        <SocialLogin />
      </div>
    </div>
  );
};

export default Register;
