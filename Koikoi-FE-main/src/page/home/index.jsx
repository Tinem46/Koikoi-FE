import Carousel from "../../components/carousel";
import FishList from "../../components/fishList";

function Home() {
    return (
      <div>
        <Carousel autoplay={true} />
        <FishList />
      </div>
    );
  }

export default Home;
  