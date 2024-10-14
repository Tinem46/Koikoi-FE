import BlogPost from "../../components/blog";
import Carousel from "../../components/carousel";
import FishList from "../../components/fishList";
import KoiNews from "../../components/news";
import KoiIntroduction from "../../components/introduce";
function Home() {
    return (
      <div>
        <Carousel autoplay={true} />
        <KoiIntroduction />
          <Carousel numberOfSlides={3}/>
        <BlogPost />
        <h1 style={{textAlign: "center", fontSize: "2rem", marginTop: "20px", color: "#3498db", fontWeight: "bold", textShadow: "1px 1px 2px #000"}}>Fish List</h1> 
        <FishList />
        <KoiNews />
      </div>
    );
}

export default Home;
