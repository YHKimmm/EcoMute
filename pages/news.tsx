// import the Layout component and hooks from React
import Layout from "@/components/layout/Layout";
import { useState, useEffect } from "react";
import Image from "next/image";

// define the shape of the article object returned by the News API
type Article = {
  title: string;
  description: string;
  urlToImage: string;
  url: string;
};

// set the API key and API endpoint for the News API
const API_KEY = "fecbf9947cfc4ecb9cf5a0fdf4a1dd8b";
const NEWS_API_URL = `https://newsapi.org/v2/everything?q=climate&apiKey=${API_KEY}`;

// define the News component
export default function News() {
  // set up state to store the articles returned by the News API
  const [articles, setArticles] = useState<Article[]>([]);

  // fetch the latest news articles when the component mounts
  useEffect(() => {
    // define an async function to fetch the news
    async function fetchNews() {
      // make a request to the News API endpoint
      const response = await fetch(NEWS_API_URL);
      // parse the JSON response
      const data = await response.json();
      // log the data to the console for debugging
      console.log(data);
      // update the state with the array of articles returned by the API
      setArticles(data.articles);
    }

    // call the fetchNews function
    fetchNews();
  }, []);

  console.log(articles);

  // render the component
  return (
    // use the Layout component to provide a consistent page layout
    <Layout>
      <div className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Latest News
          </h1>
          <div className="mt-10 grid gap-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* map over the array of articles and render a link to the article */}
            {articles.map((article, index) => (
              <a key={index} href={article.url} className="group block">
                {/* display the image for the article */}
                <div className="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden">
                  {article.urlToImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={article.urlToImage}
                      alt=""
                      className="object-cover pointer-events-none group-hover:opacity-75"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src="/no-placeholder.jpg"
                      alt=""
                      className="object-cover pointer-events-none group-hover:opacity-75"
                    />
                  )}
                </div>
                {/* display the title and description for the article */}
                <h2 className="mt-4 text-base font-medium text-white">
                  {article.title}
                </h2>
                <p className="mt-2 text-sm text-gray-300">
                  {article.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
