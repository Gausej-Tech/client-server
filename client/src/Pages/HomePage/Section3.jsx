import React from "react";

const Section3 = () => {
  return (
    <div className="text-center text-md md:text-base p-10 ">
      <p className=" text-2xl md:text-3xl font-bold mb-16">
        Why Choose Gausej?
      </p>

      <div className="flex flex-col md:flex-row gap-6 justify-center md:px-16 items-stretch">
        {/* Card 1 */}
        <div className=" rounded-2xl bg-[#f5fafe] p-6 flex-1 max-w-sm mx-auto h-auto md:h-[280px]  transition-transform duration-300 hover:shadow hover:-translate-y-2">
          <p className="text-4xl mb-5">🚀</p>
          <p className="text-xl font-semibold mb-2">Professional Audience</p>
          <p className="text-gray-500 md:text-base text-sm ">
            Connect with entrepreneurs, investors, and business professionals who
            can help turn your ideas into reality.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-[#f5fafe] rounded-2xl p-6 flex-1 max-w-sm mx-auto h-auto md:h-[280px]  transition-transform duration-300 hover:shadow hover:-translate-y-2">
          <p className="text-4xl mb-5">📊</p>
          <p className="text-xl font-semibold mb-2">Detailed Analytics</p>
          <p className="text-gray-500 md:text-base text-sm ">
            Track engagement, viewer demographics, and feedback to refine your
            business presentations.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-[#f5fafe] rounded-2xl p-6 flex-1 max-w-sm mx-auto h-auto md:h-[280px]  transition-transform duration-300 hover:shadow hover:-translate-y-2">
          <p className="text-4xl mb-5">🔒</p>
          <p className="text-xl font-semibold mb-2">Privacy Controls</p>
          <p className="text-gray-500 md:text-base text-sm ">
            Choose who can view your content — from public sharing to private
            invitations only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section3;
