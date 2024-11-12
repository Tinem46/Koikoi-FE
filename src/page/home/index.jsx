import BlogPost from "../../components/blog";
import Carousel from "../../components/carousel";
import FishList from "../../components/fishList";
import KoiNews from "../../components/news";
import KoiIntroduction from "../../components/introduce";

function Home() {
    const fishListTitleStyle = {
        textAlign: "center",
        fontSize: "36px", 
        marginTop: "20px",
        color: "#000", 
        fontWeight: "bold",
        textShadow: "1px 1px 2px #000",
        fontFamily: "'Poppins', sans-serif", 
    };

    return (
      <div>
        <Carousel autoplay={true} />
        <KoiIntroduction />
        <Carousel numberOfSlides={3} />
        <BlogPost />
        <h1 style={fishListTitleStyle}>Fish List</h1> 
        <FishList />
        <KoiNews />
      </div>
    );
}

export default Home;
