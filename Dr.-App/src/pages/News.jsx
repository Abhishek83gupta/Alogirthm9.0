import React, { useEffect, useState } from "react";
import axios from "axios";

const NewsComponent = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const API_KEY = "afa66103711244f6bbf3b57f4a91d826"; // Replace with your API key

  const categories = [
    { id: "all", name: "All News" },
    { id: "healthcare", name: "Healthcare" },
    { id: "medicine", name: "Medicine" },
    { id: "who", name: "WHO" }
  ];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const healthResponse = await axios.get(
          `https://newsapi.org/v2/everything?q=healthcare&language=en&sortBy=publishedAt&pageSize=16&apiKey=${API_KEY}`
        );
        const medicineResponse = await axios.get(
          `https://newsapi.org/v2/everything?q=India&language=en&sortBy=publishedAt&pageSize=16&apiKey=${API_KEY}`
        );
        const whoResponse = await axios.get(
          `https://newsapi.org/v2/everything?q=World Health Organization OR WHO&language=en&sortBy=publishedAt&pageSize=16&apiKey=${API_KEY}`
        );
        
        const healthNews = healthResponse.data.articles.map(article => ({...article, category: "healthcare"}));
        const medicineNews = medicineResponse.data.articles.map(article => ({...article, category: "medicine"}));
        const whoNews = whoResponse.data.articles.map(article => ({...article, category: "who"}));
        
        const allNews = [...healthNews, ...medicineNews, ...whoNews];
        setNews(allNews);
        setFilteredNews(allNews);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch news");
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    let result = [...news];
    
    // Filter by category
    if (activeCategory !== "all") {
      result = result.filter(item => item.category === activeCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    setFilteredNews(result);
  }, [activeCategory, searchTerm, news]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="text-center p-4 text-red-500">
      <p>{error}</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">Medical News Dashboard</h1>
      
      {/* Filter Section */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="w-full md:w-auto">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="w-full md:w-64">
            <div className="relative">
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Results Count */}
      <div className="mb-4 text-gray-600">
        Showing {filteredNews.length} results
      </div>
      
      {/* News Grid */}
      {filteredNews.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredNews.map((article, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <button 
                className="w-full h-full text-left focus:outline-none" 
                onClick={() => window.open(article.url, "_blank")}
              >
                <div className="relative h-48 bg-gray-200">
                  {article.urlToImage ? (
                    <img 
                      src={article.urlToImage} 
                      alt={article.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <span className="text-gray-400">No image available</span>
                    </div>
                  )}
                  
                  {/* Title overlay on image
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                    <h3 className="text-black text-sm font-medium line-clamp-2">{article.title}</h3>
                  </div> */}
                  
                  <div className="absolute top-2 right-2">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      article.category === "healthcare" ? "bg-green-500 text-white" : 
                      article.category === "medicine" ? "bg-purple-500 text-white" : 
                      "bg-blue-500 text-white"
                    }`}>
                      {article.category === "healthcare" ? "Healthcare" : 
                       article.category === "medicine" ? "Medicine" : "WHO"}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-black text-lg font-semibold mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(article.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                  {article.description && (
                    <p className="text-sm text-gray-600 line-clamp-3">{article.description}</p>
                  )}
                </div>
                <div className="px-4 py-2 bg-gray-50 flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {article.source?.name || "Unknown source"}
                  </span>
                  <span className="text-xs text-blue-600">Read more →</span>
                </div>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No results found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
          <button 
            onClick={() => {
              setActiveCategory('all');
              setSearchTerm('');
            }}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Clear filters
          </button>
        </div>
      )}
      
      {/* Pagination controls */}
      {filteredNews.length > 0 && (
        <div className="mt-8 flex justify-center">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span className="sr-only">Previous</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600">
              1
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              2
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              3
            </button>
            <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span className="sr-only">Next</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default NewsComponent;