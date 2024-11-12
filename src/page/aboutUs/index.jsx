import "./index.scss";

import koiHistoryImage from "../../assets/image/Poster_4.webp";
import koiFishVarietyImage from "../../assets/image/profile.jpeg"; // Additional image for Koi varieties

import { motion } from "framer-motion";
import { FaStore, FaUsers, FaHistory, FaBuilding } from "react-icons/fa";

import backGroundConsignment from "../../assets/image/BackgroundAboutUs.webp";
function AboutUs() {
  return (
    <div className="aboutUs">
     

      {/* Hero Section */}
      <motion.div
        className="aboutUs__hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
       
        <img
          src={backGroundConsignment}
          alt="Beautiful koi fish"
          className="aboutUs__heroImage"
        />
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
          At Koi Shop, our mission extends beyond simply selling Koi fish. We
          are dedicated to preserving and sharing the rich cultural heritage of
          Japanese Koi breeding. Through careful selection and partnerships with
          renowned breeders across Japan, we ensure that each Koi in our
          collection represents the pinnacle of quality and beauty. We strive to
          educate our customers about proper Koi care, pond maintenance, and the
          artistic appreciation of these living jewels. Our commitment to
          excellence drives us to maintain the highest standards in fish health,
          genetic diversity, and customer service.
        </p>
      </motion.div>

      {/* Store's Founding History */}
      <motion.div className="aboutUs__storeHistory">
        <h2>
          <FaBuilding /> Our Store's History
        </h2>
        <p>
          The story of Koi Shop began in 1985 when Hiroshi Tanaka, a
          third-generation Koi breeder, opened our first modest shop in Tokyo's
          historic Asakusa district. Starting with just a small collection of
          hand-picked Koi from local breeders, Hiroshi's unwavering dedication
          to quality and authenticity quickly earned the trust of both
          collectors and enthusiasts.
        </p>
        <p>
          Through the 1990s, we expanded our connections with premier Koi farms
          in Niigata Prefecture, the birthplace of modern Koi breeding. This
          partnership allowed us to offer some of Japan's most prestigious
          bloodlines to our growing customer base. In 2000, we opened our second
          location in Osaka, featuring innovative pond systems and viewing
          facilities that set new standards in the industry.
        </p>
        <p>
          Today, under the leadership of Hiroshi's daughter Sakura Tanaka, we
          operate three state-of-the-art facilities across Japan. Our team
          includes certified Koi health specialists, water quality experts, and
          passionate enthusiasts who share our founder's vision of excellence.
          We've successfully shipped premium Koi to collectors in over 30
          countries, while maintaining our commitment to personalized service
          and expert guidance.
        </p>
      </motion.div>

      {/* History of Koi Fish */}
      <motion.div className="aboutUs__history" id="aboutUs__history">
        <h2>
          <FaHistory /> The History of Koi Fish
        </h2>
        <div className="aboutUs__historyContent">
          <img
            src={koiHistoryImage}
            alt="Koi History"
            className="aboutUs__historyImage"
          />
          <div>
            <p>
              The fascinating journey of Koi fish (Cyprinus rubrofuscus) begins
              in ancient China, where they were initially farmed as a food
              source. When these carp were introduced to Japan in the 1820s,
              rice farmers in the Niigata region noticed unusual color
              variations among their stock. This discovery marked the beginning
              of ornamental Koi breeding, a practice that would evolve into a
              sophisticated art form.
            </p>
            <p>
              During the Meiji period (1868-1912), Koi breeding techniques
              advanced significantly. The first recorded Kohaku (red and white)
              Koi emerged in 1888, and by the early 1900s, many of the varieties
              we know today were established. The post-war period saw Koi
              appreciation spread globally, with Japanese breeders developing
              increasingly refined bloodlines and striking color patterns.
            </p>
            <p>
              In Japanese culture, Koi symbolize perseverance, strength, and
              success. The famous legend of the Koi climbing the Yellow River's
              waterfall at Dragon Gate, transforming into a dragon upon reaching
              the top, has inspired generations. This tale reflects the Koi's
              reputation for determination and the potential for personal growth
              through overcoming challenges.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Why Choose Us Section */}
      <motion.div
        className="aboutUs__whyChooseUs"
        id="aboutUs__whyChooseUs"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <h2>Why Choose Us?</h2>
        <div className="aboutUs__reasons">
          <div className="aboutUs__reason">
            <h3>Top-Quality Koi Fish</h3>
            <p>
              We work with the best breeders to ensure that all of our Koi are
              healthy, vibrant, and truly exceptional in color and form.
            </p>
          </div>
          <div className="aboutUs__reason">
            <h3>Expert Advice</h3>
            <p>
              Our team is passionate about Koi and is always ready to offer
              advice on selecting, caring for, and maintaining your Koi pond.
            </p>
          </div>
          <div className="aboutUs__reason">
            <h3>Customer Satisfaction</h3>
            <p>
              We strive to exceed your expectations with every interaction,
              providing a seamless shopping experience and aftercare support.
            </p>
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
            Discover a stunning array of Koi fish, from the classic red and
            white Kohaku to the dramatic black and white Showa. Each fish is
            unique and brings a touch of elegance to any pond.
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
        <h2>
          <FaUsers /> Our Team
        </h2>
        <p>
          Meet our dedicated team of Koi enthusiasts who are passionate about
          providing the best Koi fish and services to our customers. With years
          of experience in the Koi industry, our team is committed to helping
          you find the perfect Koi for your pond.
        </p>
      </motion.div>

      {/* Store Locations Section */}
      <motion.div
        className="aboutUs__locations"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <h2>
          <FaStore /> Our Store Locations
        </h2>
        <ul>
          <li>
            Tokyo, Japan: Our flagship store located in the heart of Tokyo,
            offering a wide selection of premium Koi fish.
          </li>
          <li>
            Osaka, Japan: A spacious store with a serene pond setting, perfect
            for choosing your next Koi.
          </li>
          <li>
            Kyoto, Japan: Nestled in the historic city of Kyoto, our store
            offers a unique blend of tradition and quality.
          </li>
        </ul>
      </motion.div>
    </div>
  );
}

export default AboutUs;
