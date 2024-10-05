import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./index.scss";
import axios from "axios";

export default function Carousel({
  numberOfSlides = 1,
  category = "Trending",
  autoplay = false,
}) {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    const response = await axios.get(
      "https://66e10790c831c8811b538e93.mockapi.io/Movie"
    );
    setMovies(response.data);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <Swiper
        slidesPerView={numberOfSlides}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={autoplay ? [Pagination, Autoplay] : [Pagination]}
        className={`carousel ${numberOfSlides > 1 ? "multi-item" : ""}`}
      >
        {movies
          .filter((movie) => movie.category === category)
          .map((movie) => (
            // eslint-disable-next-line react/jsx-key
            <SwiperSlide>
              <img src={movie.poster_path} alt="" />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}

Carousel.propTypes = {
  numberOfSlides: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  autoplay: PropTypes.bool,
};
