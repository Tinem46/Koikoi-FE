import './index.scss';
import logo1 from "../../assets/image/Poster_4.webp";
import logo2 from "../../assets/image/Poster_5.webp";


const KoiNews = () => {
  return (
    <div className="news-container" >
        <div className='container'>
        <div className='news'>
      <div className="news-section">
        <h1>News</h1>
        <div className="news-items">
          <div className="news-item">
            <img
              src= {logo1}
              alt="International Koi Show"
            />
            <div className="news-content">
              <h3>International Koi Show Draws Global Enthusiasts</h3>
              <p>
                Author: Yuki Takanaka <br />
                The International Koi Show in Tokyo will showcase over 500 koi entries and feature seminars on koi care and breeding.
              </p>
              <span className="publish-date">Published: September 22, 2024, 3:30 PM JST</span>
            </div>
          </div>

          <div className="news-item">
            <img
              src={logo2}
              alt="Rare Koi Fish"
            />
            <div className="news-content">
              <h3>Rare Koi Fish Sells for Record $1.8 Million</h3>
              <p>
                Author: Harashi Nakamura <br />
                The International Koi Show in Tokyo will showcase over 500 koi entries and feature seminars on koi care and breeding.
              </p>
              <span className="publish-date">Published: September 22, 2024, 7:05 PM PST</span>
            </div>
          </div>

          <div className="news-item">
            <img
              src={logo1}
              alt="Koi Pond Mental Health"
            />
            <div className="news-content">
              <h3>Koi Ponds Prove to Improve Mental Health in Cities</h3>
              <p>
                Author: Emily Thompson <br />
                Koi ponds in cities help reduce stress and improve mental well-being, leading planners to include them in urban spaces.
              </p>
              <span className="publish-date">Published: September 21, 2024, 7:16 PM PST</span>
            </div>
          </div>

          <div className="news-item">
            <img
              src={logo1}
              alt="Koi Pond Mental Health"
            />
            <div className="news-content">
              <h3>Koi Ponds Prove to Improve Mental Health in Cities</h3>
              <p>
                Author: Emily Thompson <br />
                Koi ponds in cities help reduce stress and improve mental well-being, leading planners to include them in urban spaces.
              </p>
              <span className="publish-date">Published: September 21, 2024, 7:16 PM PST</span>
            </div>
          </div>

        </div>
        <button className="show-more">Show More</button>
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