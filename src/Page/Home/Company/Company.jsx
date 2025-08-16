import logo1 from "../../../assets/CompanyLogo/c1.png";
import logo2 from "../../../assets/CompanyLogo/c2.png";
import logo3 from "../../../assets/CompanyLogo/c3.png";
import logo4 from "../../../assets/CompanyLogo/c4.png";
import design from "../../../assets/Features/design1.png";

const Compani = () => {
  return (
    <div>
      <div className="w-full z-10 flex flex-col pt-10 justify-center items-center dark:bg-[#374151f7] dark:text-white ">
        <h3 className="text-xl md:text-3xl uppercase text-[#312720] font-bold dark:bg-[#374151f7] dark:text-white ">
          Trusted by Leading Brands
        </h3>
        <img src={design} alt="design" className="w-[250px]" />
      </div>
      <div className=" mx-auto py-8 grid grid-cols-3 md:grid-cols-6 dark:bg-[#374151f7] dark:text-white border-b-2">
        <div className="w-full opacity-50 hover:opacity-100 dark:text-white">
          <img src={logo1} />
        </div>
        <div className="w-full opacity-50 hover:opacity-100">
          <img src={logo2} />
        </div>
        <div className="w-full opacity-50 hover:opacity-100">
          <img src={logo3} />
        </div>
        <div className="w-full opacity-50 hover:opacity-100">
          <img src={logo4} />
        </div>
        <div className="w-full col-span-2 flex justify-center items-center">
          <h3 className="uppercase text-sm font-bold text-center sm:text-xl ">
            We work with the best
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Compani;
