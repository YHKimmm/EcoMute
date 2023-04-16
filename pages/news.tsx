import Layout from "@/components/layout/Layout";
import { useState, useEffect } from "react";



type Article = {
  title: string;
  description: string;
  urlToImage: string;
  url: string;
};

const API_KEY = "fecbf9947cfc4ecb9cf5a0fdf4a1dd8b";
const NEWS_API_URL = `https://newsapi.org/v2/everything?q=climate&apiKey=${API_KEY}`;

export default function News() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function fetchNews() {
      const response = await fetch(NEWS_API_URL);
      const data = await response.json();
      console.log(data)
      setArticles(data.articles);
    }

    fetchNews();
    
  }, []);

  return (
    <Layout >
      <div className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Latest News
          </h1>
          <div className="mt-10 grid gap-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {articles.map((article, index) => (
              <a key={index} href={article.url} className="group block">
                <div className="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden">
                  <img
                    src={article.urlToImage}
                    alt="News Image "
                    className="object-cover pointer-events-none group-hover:opacity-75"
                    
                  />
                </div>
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
