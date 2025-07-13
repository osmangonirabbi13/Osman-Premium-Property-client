import Lottie from "lottie-react";
import React from "react";
import { Link } from "react-router";
import errorpage from "../../assets/Lottie/errorpage.json";

const ErrorPage = () => {
  return (
    <div>
      <section className="flex items-center h-full p-10 dark:bg-gray-50 dark:text-gray-800">
        <div
          className="container flex flex-col items-center justify-center px-5 mx-auto my-8"
          bis_skin_checked="1"
        >
          <div className="max-w-md text-center" bis_skin_checked="1">
            <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400">
              <span className="sr-only">Error</span>
            </h2>
            <div className="  ">
              <Lottie animationData={errorpage} />
            </div>
            <p className="text-2xl font-semibold md:text-3xl">
              Sorry, we couldn't find this page.
            </p>
            <p className="mt-4 mb-8 dark:text-gray-600">
              But dont worry, you can find plenty of other things on our
              homepage.
            </p>
            <Link
              rel="noopener noreferrer"
              to="/"
              className="px-8 py-3 font-semibold rounded btn  text-xl btn-accent"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ErrorPage;
