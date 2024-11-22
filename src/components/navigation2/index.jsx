/* eslint-disable react/prop-types */
import { Breadcrumb } from "antd";
import "./index.scss";
import { useNavigate } from "react-router-dom";

function NavBar({ preOn, standOn,selectedMenu="" }) {
  const navigate = useNavigate();

  return (
    <div className="navigation2">
      <div className="breadcrumbBar">
        <Breadcrumb separator="|">
          <Breadcrumb.Item>
            <span
              onClick={() => navigate("/")}
              style={{ cursor: "pointer", fontWeight: "normal" }}
            >
              Home
            </span>
          </Breadcrumb.Item>
          {preOn && (
            <Breadcrumb.Item>
              <span
                onClick={() => navigate(`/${preOn}`)}
                style={{ cursor: "pointer", fontWeight: "normal" }}
              >
                {preOn}
              </span>
            </Breadcrumb.Item>
          )}
          <Breadcrumb.Item>
            <span
              onClick={() => navigate(`/${standOn}`)}
              style={{ cursor: "pointer", fontWeight: "bold" }}
            >
              {standOn}
            </span>
          </Breadcrumb.Item>

          {selectedMenu && (
              <Breadcrumb.Item style={{ fontWeight: "bold" }}>
                {selectedMenu.split(' ').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </Breadcrumb.Item>
            )}
        </Breadcrumb>
      </div>
    </div>
  );
}

export default NavBar;
