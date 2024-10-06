import "./index.scss";
import koiFishImage from "../../assets/image/Poster_5.webp";
import koiHistoryImage from  "../../assets/image/Poster_4.webp";
import koiFishVarietyImage from "../../assets/image/profile.jpeg"; // Additional image for Koi varieties


function AboutUs() {
  return (
    <div className="aboutUs">
      <div className="aboutUs__line"></div>
      <div className="aboutUs__title">
        <h1>About Us</h1>
      </div>
      <div className="aboutUs__content">
        <img src={koiFishImage} alt="Koi Fish" className="aboutUs__image" />
        <p>
          Welcome to Koi Shop, your trusted source for premium quality Koi fish. 
          With a deep passion for Koi and years of experience, we are dedicated to 
          bringing the beauty and elegance of these majestic fish directly to your pond.
           Our mission is to provide Koi enthusiasts with a wide selection of healthy, 
          high-quality Koi sourced from the finest breeders in Japan. We believe that 
          every Koi fish we offer is not just a pet but a living piece of art that brings 
          serenity, harmony, and beauty to your home.
        </p>
      </div>

      {/* New History Section */}
      <div className="aboutUs__history">
        <h1>The History of Koi Fish</h1>
        <div className="aboutUs__historyContent">
          <img
            src={koiHistoryImage}
            alt="Koi History"
            className="aboutUs__historyImage"
          />
          <p>
            Koi fish, originally bred in Japan, have a rich history that dates back to 
            the 19th century. Koi were initially bred from common carp and were selected 
            for their vibrant colors and patterns. Over the centuries, Koi became a 
            symbol of good fortune, strength, and perseverance in Japanese culture. 
            Today, Koi fish are admired worldwide not only for their beauty but also for 
            their cultural significance. Each type of Koi, such as Kohaku, Taisho 
            Sanke, and Showa, represents a unique blend of colors and patterns, making 
            them highly prized by enthusiasts.
          </p>
        </div>
      </div>

      {/* Existing Why Choose Us Section */}
      <div className="aboutUs__content1">
        <h1>Why Choose Us?</h1>
        <ul>
          <li>Top-Quality Koi Fish: We work with the best breeders to ensure that all of our Koi are healthy, vibrant, and truly exceptional in color and form.</li>
          <li>Expert Advice: Our team is passionate about Koi and is always ready to offer advice on selecting, caring for, and maintaining your Koi pond.</li>
          <li>Customer Satisfaction: We strive to exceed your expectations with every interaction, providing a seamless shopping experience and aftercare support.</li>
        </ul>
      </div>

      {/* New Image Section for Koi Varieties */}
      <div className="aboutUs__gallery">
      
        <img
          src={koiFishVarietyImage}
          alt="Koi Varieties"
          className="aboutUs__varietyImage"
        />
        <p>
          Explore a variety of stunning Koi fish, from the classic red and white Kohaku 
          to the dramatic black and white Showa. Each fish is unique and brings a touch 
          of elegance to any pond.
        </p>
      </div>
      <div className="aboutUs__content2">
        <h1>Our Team</h1>
        <p>
          Meet our dedicated team of Koi enthusiasts who are passionate about 
          providing the best Koi fish and services to our customers.
          <br />
          With years of experience in the Koi industry, our team is committed to helping you find the perfect Koi for your pond.
          <br />
          Our team is dedicated to providing you with the best Koi fish and services.
        </p>

      </div>

      {/* New Store Locations Section */}
      <div className="aboutUs__locations">
        <h1>Our Store Locations</h1>
        <ul>
          <li>Tokyo, Japan: Our flagship store located in the heart of Tokyo, offering a wide selection of premium Koi fish.</li>
          <li>Osaka, Japan: A spacious store with a serene pond setting, perfect for choosing your next Koi.</li>
          <li>Kyoto, Japan: Nestled in the historic city of Kyoto, our store offers a unique blend of tradition and quality.</li>
        </ul>
      </div>
    </div>
  );
}

export default AboutUs;