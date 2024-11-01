import './index.scss';
import logo1 from "../../assets/image/Poster_4.webp";
import logo2 from "../../assets/image/Poster_5.webp";
import { useState } from 'react';

const KoiNews = () => {
  const [showAll, setShowAll] = useState(false);

  const handleShowMore = () => {
    setShowAll(true);
  };

  const handleShowLess = () => {
    setShowAll(false);
  };

  const newsItems = [
    {
      image: logo1,
      alt: "International Koi Show",
      title: "International Koi Show Draws Global Enthusiasts",
      author: "Yuki Takanaka",
      content: "The International Koi Show in Tokyo will showcase over 500 koi entries and feature seminars on koi care and breeding.",
      publishDate: "Published: September 22, 2024, 3:30 PM JST"
    },
    {
      image: logo2,
      alt: "Rare Koi Fish",
      title: "Rare Koi Fish Sells for Record $1.8 Million",
      author: "Harashi Nakamura",
      content: "The International Koi Show in Tokyo will showcase over 500 koi entries and feature seminars on koi care and breeding.",
      publishDate: "Published: September 22, 2024, 7:05 PM PST"
    },
    {
      image: logo1,
      alt: "Koi Pond Mental Health",
      title: "Koi Ponds Prove to Improve Mental Health in Cities",
      author: "Emily Thompson",
      content: "Koi ponds in cities help reduce stress and improve mental well-being, leading planners to include them in urban spaces.",
      publishDate: "Published: September 21, 2024, 7:16 PM PST"
    },
    {
      image: logo1,
      alt: "Koi Pond Mental Health",
      title: "Koi Ponds Prove to Improve Mental Health in Cities",
      author: "Emily Thompson",
      content: "Koi ponds in cities help reduce stress and improve mental well-being, leading planners to include them in urban spaces.",
      publishDate: "Published: September 21, 2024, 7:16 PM PST"
    },
    {
      image: logo2,
      alt: "Koi Breeding Success",
      title: "New Breeding Technique Yields Stunning Koi Varieties",
      author: "Ken Watanabe",
      content: "Japanese breeders announce breakthrough in developing new metallic koi patterns through selective breeding.",
      publishDate: "Published: September 20, 2024, 9:30 AM JST"
    },
    {
      image: logo1,
      alt: "Koi Conservation",
      title: "Conservation Efforts Save Ancient Koi Bloodlines",
      author: "Sarah Chen",
      content: "International collaboration preserves rare koi varieties through dedicated breeding programs.",
      publishDate: "Published: September 19, 2024, 2:45 PM PST"
    },
    {
      image: logo2,
      alt: "Koi Technology",
      title: "Smart Pond Technology Revolutionizes Koi Care",
      author: "David Miller",
      content: "New IoT devices help monitor water quality and fish health in real-time for optimal koi maintenance.",
      publishDate: "Published: September 18, 2024, 11:20 AM EST"
    },
  ];

  return (
    <div className="news-container">
      <div className='container'>
        <div className='news'>
          <div className="news-section">
            <h1>News</h1>
            <div className="news-items">
              {newsItems.slice(0, showAll ? newsItems.length : 4).map((item, index) => (
                <div className="news-item" key={index}>
                  <img src={item.image} alt={item.alt} />
                  <div className="news-content">
                    <h3>{item.title}</h3>
                    <p>
                      Author: {item.author} <br />
                      {item.content}
                    </p>
                    <span className="publish-date">{item.publishDate}</span>
                  </div>
                </div>
              ))}
            </div>
            {!showAll ? (
              <button className="show-more" onClick={handleShowMore}>
                Show More
              </button>
            ) : (
              <button className="show-more" onClick={handleShowLess}>
                Show Less
              </button>
            )}
          </div>
        </div>
        
        <div className='help'>
          <div className="help-section">
            <div className="both">
              <h1>We’re here to help</h1>
              <input type="text" className="search-bar" placeholder="Search keyword" />
              <ul className="help-questions">
                <li>What types of koi fish do you offer for sale? ➔</li>
                <li>How can I place an order for koi fish on your website? ➔</li>
                <li>Do you provide international shipping for koi fish? ➔</li>
                <li>What are the payment methods available for purchasing koi fish? ➔</li>
                <li>What should I do to prepare my pond for new koi fish? ➔</li>
                <li>What is your return or refund policy if a koi fish arrives unhealthy? ➔</li>
                <li>What are the requirements for selling koi fish on consignment? ➔</li>
                <li>How do you ensure the health and quality of koi fish under consignment? ➔</li>
                <li>Can I visit your facility to view koi fish before purchasing or consigning? ➔</li>
              </ul>
              <div className="contact">
                <p>Got more questions?</p>
                <h3>Get in Touch</h3>
                <p>Our customer service team is here to help find the right cleanses for you. You can call, WhatsApp or email us.</p>
                <button className="contact-button">Contact Us</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KoiNews;