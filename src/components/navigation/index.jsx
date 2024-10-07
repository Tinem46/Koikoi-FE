/* eslint-disable react/prop-types */
import { Breadcrumb } from "antd";
import logo2 from "../../assets/image/Poster_5.webp";
import "./index.scss";
import { useNavigate } from "react-router-dom";

function Naviagtion({ selectedMenu="", triggerReset=()=>{}, name="shop", link="/"}) {
  const navigate = useNavigate();
  return (
    <div className="navigation">
      <img className="pictureOutline" src={logo2} alt="Koi pond background" />
      <div className="container">
        <h1 className="shopTitle">{name}</h1>
        <div className="breadcrumbBar">
          <Breadcrumb>
            {/* Home should navigate to / */}
            <Breadcrumb.Item>
              <span
                onClick={() => navigate("/")}
                style={{ cursor: "pointer", fontWeight: "normal" }}
              >
                Home
              </span>
            </Breadcrumb.Item>

            {/* Shop should be clickable and reset the fish list */}
            <Breadcrumb.Item>
              <span
                onClick={() => {
                  triggerReset(); // Trigger the reset function to reset the fish list
                  navigate({link}); // Navigate to /FishShop
                }}
                style={{
                  cursor: "pointer",
                  fontWeight: !selectedMenu ? "bold" : "normal",
                }}
              >
                {name}
              </span>
            </Breadcrumb.Item>

            {/* selectedMenu (like Asagi) will be bold if it exists */}
            {selectedMenu && (
              <Breadcrumb.Item style={{ fontWeight: "bold" }}>
                {selectedMenu.charAt(0).toUpperCase() + selectedMenu.slice(1)}
              </Breadcrumb.Item>
            )}
          </Breadcrumb>
        </div>
      </div>
    </div>
  );
}

export default Naviagtion;
