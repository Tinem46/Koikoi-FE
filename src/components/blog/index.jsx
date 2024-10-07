import "./index.scss";
import pos1 from "../../assets/image/picBlog1.jpg";
import pos2 from "../../assets/image/picBlog2.jpg";
const BlogPost = () => {
  return (
    <div className="blog-post-container">
      <h1 className="blog-title">Blog Post</h1>
      <div className="post-grid">
        <div className="post">
          <img src={pos1} alt="The Majestic KOI Fish" className="post-image" />
          <div className="post-content">
            <h3>The Majestic KOI Fish: History and Symbolism</h3>
            <p>Monday, January 15, 2024 - 9:00 AM</p>
            <p>
              Dive into the rich history of KOI fish and explore their origins
              in Japan and China. Discuss their cultural significance,
              representing perseverance, strength, and good fortune.
            </p>
            <button className="see-more-btn">See More</button>
          </div>
        </div>

        <div className="post">
          <img
            src={pos2}
            alt="Beginner's Guide to KOI Fish Care"
            className="post-image"
          />
          <div className="post-content">
            <h3>
              Beginner’s Guide to KOI Fish Care: Everything You Need to Know
            </h3>
            <p>Wednesday, January 17, 2024 - 12:00 PM</p>
            <p>
              Offer essential tips for new KOI owners on how to properly care
              for their fish to ensure a long, healthy life.
            </p>
            <button className="see-more-btn">See More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
