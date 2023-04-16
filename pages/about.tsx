import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <>
    <Header/>
    <section className="text-gray-600 body-font">
      <div className="max-w-5xl pt-52 pb-24 mx-auto">
        <h1 className="text-80 text-center font-4 lh-6 ld-04 font-bold text-white mb-6">
          About Us
        </h1>
        <div className="container flex flex-col items-center justify-center mx-auto">
        <video autoPlay muted loop id="bg-video">
            <source src="/Globe-Animation.webm" type="video/mp4"/>
            {/* Your browser does not support HTML5 video. */}
        </video>
        </div>
        <p className="mx-auto text-xl text-center text-gray-300 font-normal leading-relaxed fs521 lg:w-2/3">
        EcoMute is an application designed to help individuals visualize and reduce their carbon footprint. Our goal is to provide the necessary tools and resources to make a positive impact on the environment. We believe that every person has a role to play in preserving our planet for future generations.
        </p>
        <div className="pt-12 pb-24 max-w-4xl mx-auto fsac4 md:px-1 px-3">
          <div className="ktq4">
            <img className="w-10" src="/icons8-done-40.png"></img>
            <h3 className="pt-3 font-semibold text-lg text-white">
              Our Mission
            </h3>
            <p className="pt-2 value-text text-md text-gray-200 fkrr1">
              Our mission is to empower individuals and communities to make sustainable choices that reduce their impact on the environment. We aim to create a more sustainable future for all by providing education, tools, and resources that inspire and enable action.
            </p>
          </div>
          <div className="ktq4">
            <img className="w-10" src="/icons8-done-40.png"></img>
            <h3 className="pt-3 font-semibold text-lg text-white">
              Our Team
            </h3>
            <p className="pt-2 value-text text-md text-gray-200 fkrr1">
              Our team is made up of passionate individuals who are committed to making a difference in the world. We come from diverse backgrounds and have a wide range of skills and expertise, but we are united by our shared goal of creating a more sustainable future for all.
            </p>
          </div>
          <div className="ktq4">
            <img className="w-10" src="/icons8-done-40.png"></img>
            <h3 className="pt-3 font-semibold text-lg text-white">
              Contact Us
            </h3>
            <p className="pt-2 value-text text-md text-gray-200 fkrr1">
              If you have any questions, comments, or suggestions, please don`&apos;`t hesitate to get in touch. You can reach us by email, phone, or through our website`&apos;`s contact form. We look forward to hearing from you!
            </p>
          </div>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
};

export default About;
