import { useState } from "react";

type SubscribeResponse = {
  success: boolean;
  message: string;
};

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState<SubscribeResponse>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const json = await res.json();
    setResponse(json);
    setEmail("");
  };

  return (
    <section className="relative pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <div className="py-24 md:py-36">
          <h1 className="mb-5 text-5xl font-bold text-white">
            Subscribe to our newsletter
          </h1>
          <h1 className="mb-9 text-2xl font-semibold text-gray-200">
            Enter your email address and get our newsletters straight away.
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center w-full md:flex md:flex-row"
          >
            <input
              type="email"
              placeholder="jack@example.com"
              name="email"
              className="border border-gray-600 w-full md:w-2/4 pr-2 pl-2 py-3 mt-2 rounded-md text-gray-800 font-semibold hover:border-gray-700 bg-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="inline-flex items-center px-14 py-3 mt-3 ml-4 font-medium text-black transition duration-500 ease-in-out transform bg-transparent border rounded-md bg-white"
            >
              <span className="justify-center">Subscribe</span>
            </button>
          </form>
          {response && (
            <p className={response.success ? "text-green-500" : "text-red-500"}>
              {response.message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
