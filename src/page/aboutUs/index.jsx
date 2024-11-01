import "./index.scss";
import koiFishImage from "../../assets/image/Poster_5.webp";
import koiHistoryImage from  "../../assets/image/Poster_4.webp";
import koiFishVarietyImage from "../../assets/image/profile.jpeg"; // Additional image for Koi varieties
import Naviagtion from '../../components/navigation';
import { motion } from "framer-motion";
import { FaStore, FaUsers, FaHistory, FaBuilding } from "react-icons/fa";

function AboutUs() {
  return (
    <div className="aboutUs">
      <Naviagtion name="About Us" link="/aboutUs" />
      
      {/* Hero Section */}
      <motion.div 
        className="aboutUs__hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="aboutUs__heroContent">
          <h1>Welcome to Koi Shop</h1>
          <p>Your trusted source for premium quality Koi fish</p>
        </div>
      </motion.div>

      {/* Mission Statement */}
      <motion.div 
        className="aboutUs__mission"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <h2>Our Mission</h2>
        <p>
          Our mission is to provide Koi enthusiasts with a wide selection of healthy, 
          high-quality Koi sourced from the finest breeders in Japan. We believe that 
          every Koi fish we offer is not just a pet but a living piece of art that brings 
          serenity, harmony, and beauty to your home.
        </p>
      </motion.div>

      {/* Store's Founding History */}
      <motion.div 
        className="aboutUs__storeHistory"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <h2><FaBuilding /> Our Store's History</h2>
        <p>
          Founded in 1985 by Koi enthusiast Hiroshi Tanaka, our store began as a small 
          family-owned business in Tokyo. With a passion for Koi and a commitment to 
          quality, we quickly gained a reputation for offering the finest Koi fish in 
          Japan. Over the years, we've expanded to multiple locations, always maintaining 
          our dedication to excellence and customer satisfaction. Today, we're proud to 
          be one of the leading Koi suppliers, sharing our love for these living works 
          of art with customers around the world.
        </p>
      </motion.div>

      {/* History of Koi Fish */}
      <motion.div 
        className="aboutUs__history"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <h2><FaHistory /> The History of Koi Fish</h2>
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
            their cultural significance.
          </p>
        </div>
      </motion.div>

      {/* Why Choose Us Section */}
      <motion.div 
        className="aboutUs__whyChooseUs"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <h2>Why Choose Us?</h2>
        <div className="aboutUs__reasons">
          <div className="aboutUs__reason">
            <h3>Top-Quality Koi Fish</h3>
            <p>We work with the best breeders to ensure that all of our Koi are healthy, vibrant, and truly exceptional in color and form.</p>
          </div>
          <div className="aboutUs__reason">
            <h3>Expert Advice</h3>
            <p>Our team is passionate about Koi and is always ready to offer advice on selecting, caring for, and maintaining your Koi pond.</p>
          </div>
          <div className="aboutUs__reason">
            <h3>Customer Satisfaction</h3>
            <p>We strive to exceed your expectations with every interaction, providing a seamless shopping experience and aftercare support.</p>
          </div>
        </div>
      </motion.div>

      {/* Koi Varieties Gallery */}
      <motion.div 
        className="aboutUs__gallery"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <h2>Explore Koi Varieties</h2>
        <div className="aboutUs__galleryContent">
          <img
            src={koiFishVarietyImage}
            alt="Koi Varieties"
            className="aboutUs__varietyImage"
          />
          <p>
            Discover a stunning array of Koi fish, from the classic red and white Kohaku 
            to the dramatic black and white Showa. Each fish is unique and brings a touch 
            of elegance to any pond.
          </p>
        </div>
      </motion.div>

      {/* Our Team Section */}
      <motion.div 
        className="aboutUs__team"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <h2><FaUsers /> Our Team</h2>
        <p>
          Meet our dedicated team of Koi enthusiasts who are passionate about 
          providing the best Koi fish and services to our customers. With years of 
          experience in the Koi industry, our team is committed to helping you find 
          the perfect Koi for your pond.
        </p>
      </motion.div>

      {/* Store Locations Section */}
      <motion.div 
        className="aboutUs__locations"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <h2><FaStore /> Our Store Locations</h2>
        <ul>
          <li>Tokyo, Japan: Our flagship store located in the heart of Tokyo, offering a wide selection of premium Koi fish.</li>
          <li>Osaka, Japan: A spacious store with a serene pond setting, perfect for choosing your next Koi.</li>
          <li>Kyoto, Japan: Nestled in the historic city of Kyoto, our store offers a unique blend of tradition and quality.</li>
        </ul>
      </motion.div>
    </div>
  );
}

export default AboutUs;
