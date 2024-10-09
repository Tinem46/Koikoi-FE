import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "./index.scss";
import api from "../../config/api";

export default function Carousel({
  numberOfSlides = 1,
  category = "Trending",
  autoplay = false,
}) {
  const [koi, setKoi] = useState([]);

  const fetchKoi = async () => {
    const response = await api.get("Koi");
    setKoi(response.data);
  };

  useEffect(() => {
    fetchKoi();
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
        {koi
          .filter((fish) => fish.category === category)
          .map((fish) => (
            // eslint-disable-next-line react/jsx-key
            <SwiperSlide>
              <img src={fish.image} alt="" />
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
