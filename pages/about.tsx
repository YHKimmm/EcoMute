import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Layout from "@/components/layout/Layout";
import Link from "next/link";

const About = () => {
  return (
    <>
      <Layout>
        <section className="text-gray-600 body-font ">
          <div className="max-w-5xl pt-5 pb-5 mx-auto">
            <h1 className="text-80 text-center font-4  font-bold text-white mb-6 mt-24">
              About Us
            </h1>
            <div className="container flex flex-col items-center justify-center mx-auto">
              <video autoPlay muted loop id="bg-video">
                <source src="/Globe-Animation.webm" type="video/mp4" />
                {/* Your browser does not support HTML5 video. */}
              </video>
            </div>
            <p className="mx-auto text-xl text-center p-14 text-gray-300 font-normal leading-relaxed lg:w-2/3">
              EcoMute is an application designed to help individuals visualize
              and reduce their carbon footprint. Our goal is to provide the
              necessary tools and resources to make a positive impact on the
              environment. We believe that every person has a role to play in
              preserving our planet for future generations.
            </p>
            <div className="pt-12 pb-5 max-w-4xl mx-auto fsac4 md:px-1 px-3">
              <div className="bg-gray-900 p-8 rounded-lg">
                <h3 className="pt-3 font-semibold text-lg text-white">
                  Our Mission
                </h3>
                <p className="pt-2 value-text text-md text-gray-200 fkrr1">
                  Our mission is to empower individuals and communities to make
                  sustainable choices that reduce their impact on the
                  environment. We aim to create a more sustainable future for
                  all by providing education, tools, and resources that inspire
                  and enable action.
                </p>
                <p className="pt-2 value-text text-md text-gray-200 fkrr1">
                  This is a global issue that requires a global solution. We
                  believe that by working together, we can make a difference.
                </p>
              </div>
              <div className="bg-gray-900 p-8 rounded-lg">
                <h3 className="pt-3 font-semibold text-lg text-white">
                  What is EcoMute?
                </h3>
                <p className="pt-2 value-text text-md text-gray-200 fkrr1">
                  EcoMute is a web application that helps users compare travel
                  methods and estimated emissions for their daily commutes. By
                  inputting two locations and selecting different transportation
                  methods, users can make more informed decisions to reduce
                  their carbon footprint and make sustainable choices. Our goal
                  is to empower users to take action in promoting sustainability
                  and reducing carbon footprints.
                </p>
              </div>
              <div className="bg-gray-900 p-8 rounded-lg">
                <h3 className="pt-3 font-semibold text-lg text-white">
                  Our Team
                </h3>
                <p className="pt-2 value-text text-md text-gray-200 fkrr1">
                  The EcoMute team is comprised of Brayden, Mason, Renz, and
                  Scott. We met while studying in the System Software Developer
                  program at BCIT. Despite our diverse backgrounds and skill
                  sets, we are united in our passion for creating effective,
                  user-friendly solutions that make a positive impact on the
                  world.
                </p>
              </div>
              <div className="bg-gray-900 p-8 rounded-lg">
                <h3 className="pt-3 font-semibold text-lg text-white">
                  Contact Us
                </h3>
                <p className="pt-2 value-text text-md text-gray-200 fkrr1">
                  If you have any questions, comments, or suggestions, please
                  don&apos;t hesitate to get in touch. You can reach us by email
                  here:
                  <br />
                  <br />
                  <Link href="mailto:ecomutebcit@gmail.com?subject=Inquiry&body=Hello, I have a question about EcoMute.">
                    <span>ecomutebcit@gmail.com</span>
                  </Link>
                  <br />
                  <br />
                  We look forward to hearing from you!
                </p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="/forest.jpg"
              alt="Background Image"
              className="absolute inset-0 h-full w-full object-cover z-0"
            />
            <div className="max-w-lg py-6 px-4 mb-[15rem] bg-gray-900 opacity-[.90] rounded-lg shadow-md text-left mx-auto relative z-10">
              <h3 className="pt-3 font-semibold text-lg text-green-500">
                How Are Emission Values Calculated?
              </h3>
              <p className="pt-2 value-text text-md text-gray-300">
                EcoMute calculates estimated emissions based on various factors,
                including distance, transportation mode, and fuel type. Our data
                is sourced from reputable organizations and databases, such as
                the United States Environmental Protection Agency and the
                International Energy Agency. To estimate the emissions, we use
                the CO2 emissions from a gallon of gasoline (8,887 grams
                CO2/gallon) or diesel (10,180 grams CO2/gallon), along with the
                distance of the commute and the mileage of the vehicle. However,
                please note that these values are estimates and may not be
                entirely accurate for your specific situation.
              </p>
              <p className="pt-2 value-text text-md text-gray-300">
                Please note that the intent of this estimation is to provide a
                rough estimate for educational and awareness purposes to help
                individuals better visualize the amount of CO2 emissions from
                their daily commutes.
              </p>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default About;
