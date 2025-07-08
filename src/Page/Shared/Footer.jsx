import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { Link } from "react-router";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <>
      <footer className="bg_image">
        <div className=" bg-[#2c241e] dark:bg-[#374151f7]">
          <div className="mx-auto container py-9">
            <div className="grid grid-cols-1 gap-8 px-14 lg:px-4 lg:py-8 lg:grid-cols-4">
              <div>
                <div>
                  <img className="w-60 lg:mx-auto" src={logo} alt="" />
                </div>

                <div className="flex mt-6 space-x-3 lg:justify-center">
                  <a
                    href="https://www.facebook.com/osmangonirabbi1"
                    target="blank"
                    className="text-secondary border-2 p-2 rounded-full border-secondary hover:text-white hover:bg-secondary"
                  >
                    <FaFacebookF></FaFacebookF>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/md-osman-goni-rabbi/"
                    target="blank"
                    className="text-secondary border-2 p-2 rounded-full border-secondary hover:text-white hover:bg-secondary"
                  >
                    <FaLinkedinIn></FaLinkedinIn>
                  </a>
                  <a
                    href="https://github.com/osmangonirabbi13"
                    target="blank"
                    className="text-secondary border-2 p-2 rounded-full border-secondary hover:text-white hover:bg-secondary  "
                  >
                    <FaGithub></FaGithub>
                  </a>
                </div>
              </div>
              <div>
                <h2 className="mb-6 text-base font-semibold text-white uppercase dark:text-white">
                  Informations
                </h2>
                <ul className="text-gray-300 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      About us
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Privacy Policy
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Term and Conditions
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-base font-semibold text-white uppercase dark:text-white">
                  Quick Links
                </h2>
                <ul className="text-gray-300 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <Link to="" className="hover:underline">
                      Apartment
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link to="" className="hover:underline">
                      Announcements
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link to="" className="hover:underline">
                      All coupons
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-base font-semibold text-white uppercase dark:text-white">
                  Contact info
                </h2>
                <ul className="text-gray-300 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <p>
                      <b>Address :</b> Gobindapur Hazir Bazar, Feni, Bangladesh
                    </p>
                  </li>
                  <li className="mb-4">
                    <p>
                      <b>Phone :</b> +88 01725 13 30 45
                    </p>
                  </li>
                  <li className="mb-4">
                    <p>
                      <b>Email :</b> osmangoniyou12@gmail.com
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t dark:border-gray-500 border-gray-200">
            <div className="px-4 py-6 container mx-auto text-center">
              <span className="text-sm text-gray-300 dark:text-gray-400 sm:text-center">
                <p>
                  Copyright © {new Date().getFullYear()} - All right reserved by
                  Osman Premium Property
                </p>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
