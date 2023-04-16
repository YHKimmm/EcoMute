import Image from "next/image";
import Link from "next/link";

export default function Main() {
  return (
    <section className="text-gray-600 body-font">
      <div className="max-w-5xl pt-52 pb-24 mx-auto">
        <h1 className="text-80 text-center font-4 lh-6 ld-04 font-bold text-white mb-6">
          ECOMUTE
        </h1>
        <h2 className="text-2xl font-4 font-semibold lh-6 ld-04 pb-11 text-gray-700 text-center">
          Do you know how much you are contributing to the environment?
          <br />
          Find out with EcoMute.
        </h2>
        <div className="ml-6 text-center">
          <Link
            className="inline-flex items-center py-3 font-semibold text-black transition duration-500 ease-in-out transform bg-transparent bg-white px-7 text-md md:mt-0 hover:text-black hover:bg-white focus:shadow-outline"
            href="/climate"
          >
            <div className="flex text-lg">
              <span className="justify-center">See Your Emissions</span>
            </div>
          </Link>
          <Link
            className="inline-flex items-center py-3 font-semibold tracking-tighter text-white transition duration-500 ease-in-out transform bg-transparent ml-11 bg-gradient-to-r from-blue-500 to-blue-800 px-14 text-md md:mt-0 focus:shadow-outline"
            href="/news"
          >
            <div className="flex text-lg">
              <span className="justify-center">How to Help</span>
            </div>
          </Link>
        </div>
      </div>
      <div className="container flex flex-col items-center justify-center mx-auto">
        <Image
          src="/carbon-emission.jpg"
          className="object-cover object-center w-3/4 mb-10 border shadow-md rounded-lg"
          alt="carbon emission image"
          width="1400"
          height="1400"
        />
      </div>
      <h2 className="pt-40 mb-1 text-2xl font-semibold tracking-tighter text-center text-gray-200 lg:text-7xl md:text-6xl">
        Do your part
      </h2>
      <br></br>
      <p className="mx-auto text-xl text-center text-gray-300 font-normal leading-relaxed fs521 lg:w-2/3">
        Here are some ways you can help reduce CO2 emissions from cars and
        travel:
      </p>
      <div className="pt-12 pb-24 max-w-4xl mx-auto fsac4 md:px-1 px-3">
        <div className="ktq4">
          <Image
            width="50"
            height="50"
            className="w-10"
            alt="checkmark"
            src="/checkmark.png"
          />
          <h3 className="pt-3 font-semibold text-lg text-white">
            Use Public Transportation
          </h3>
          <p className="pt-2 value-text text-md text-gray-200 fkrr1">
            Use public transportation, such as buses or trains, instead of
            driving a car to reduce CO2 emissions.
          </p>
        </div>
        <div className="ktq4">
          <Image
            width="50"
            height="50"
            className="w-10"
            alt="checkmark"
            src="/checkmark.png"
          />
          <h3 className="pt-3 font-semibold text-lg text-white">Carpool</h3>
          <p className="pt-2 value-text text-md text-gray-200 fkrr1">
            Carpool with friends, family, or coworkers to reduce the number of
            cars on the road and decrease CO2 emissions.
          </p>
        </div>
        <div className="ktq4">
          <Image
            width="50"
            height="50"
            className="w-10"
            alt="checkmark"
            src="/checkmark.png"
          />
          <h3 className="pt-3 font-semibold text-lg text-white">
            Use Electric or Hybrid Vehicles
          </h3>
          <p className="pt-2 value-text text-md text-gray-200 fkrr1">
            Use electric or hybrid vehicles to reduce emissions from
            transportation.
          </p>
        </div>
        <div className="ktq4">
          <Image
            width="50"
            height="50"
            className="w-10"
            alt="checkmark"
            src="/checkmark.png"
          />
          <h3 className="pt-3 font-semibold text-lg text-white">
            Bike or Walk
          </h3>
          <p className="pt-2 value-text text-md text-gray-200 fkrr1">
            Consider biking or walking instead of driving short distances to
            reduce CO2 emissions.
          </p>
        </div>
      </div>
      <div className="pt-32 pb-32 max-w-6xl mx-auto fsac4 md:px-1 px-3">
        <div className="ktq4">
          <Image
            width="50"
            height="50"
            className="w-10"
            alt="checkmark"
            src="/checkmark.png"
          />
          <h3 className="pt-3 font-semibold text-lg text-white">
          Reduce water usage
          </h3>
          <p className="pt-2 value-text text-md text-gray-200 fkrr1">
          Conserving water can help reduce carbon emissions by reducing the energy required to treat and transport water.
          </p>
        </div>
        <div className="ktq4">
          <Image
            width="50"
            height="50"
            className="w-10"
            alt="checkmark"
            src="/checkmark.png"
          />
          <h3 className="pt-3 font-semibold text-lg text-white">
          Use energy-efficient appliances
          </h3>
          <p className="pt-2 value-text text-md text-gray-200 fkrr1">
          Switching to energy-efficient appliances and light bulbs can significantly reduce your energy consumption and carbon emissions.
          </p>
        </div>
      </div>
      <section className="relative pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="py-24 md:py-36">
            <h1 className="mb-5 text-6xl font-bold text-white">
              Subscribe to our newsletter
            </h1>
            <h1 className="mb-9 text-2xl font-semibold text-gray-200">
              Enter your email address and get our newsletters straight away.
            </h1>
            <input
              type="email"
              placeholder="jack@example.com"
              name="email"
              className="border border-gray-600 w-1/4 pr-2 pl-2 py-3 mt-2 rounded-md text-gray-800 font-semibold hover:border-gray-700 bg-black"
            />{" "}
            <Link
              className="inline-flex items-center px-14 py-3 mt-2 ml-2 font-medium text-black transition duration-500 ease-in-out transform bg-transparent border rounded-lg bg-white"
              href="/"
            >
              <span className="justify-center">Subscribe</span>
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}
