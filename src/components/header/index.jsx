import "./index.scss";
import { UserOutlined, SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/image/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/userSlice";
import { Dropdown } from "antd";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const user = useSelector((state) => state.user);
  const isLoggedIn = user ? user.isLoggedIn : false;

  const userMenu = (
    <ul className="header__dropdown-menu">
      <li onClick={handleProfile}>Profile</li>
      {isLoggedIn ? (
        <li onClick={handleLogout}>Logout</li>
      ) : (
        <li onClick={() => navigate("/login")}>Login</li>
      )}
    </ul>
  );

  function handleProfile() {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(`/profile`);
    } else {
      navigate(`/login`);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  }

  return (
    <header className="header">
      <div className="header__logo" onClick={() => navigate("/")}>
        <img src={logo} alt="logo" width={80} />
      </div>
      <nav className="header__nav">
        <div className="header__nav-center">
          <ul>
            <li onClick={() => navigate("/")} className="header__home-link">
              Home
            </li>
            <li onClick={() => navigate("/fish")}>Fish</li>
            <li onClick={() => navigate("/consignment")}>Consignment</li>
            <li onClick={() => navigate("/info")}>Info</li>
          </ul>
        </div>
        <div className="header__nav-right">
          <ul>
            <li>
              {showSearch && (
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className={`header__search-input ${showSearch ? 'show' : ''}`}
                />
              )}
              <SearchOutlined style={{ cursor: 'pointer' }} onClick={() => setShowSearch(!showSearch)} />
            </li>
            <li>
              <Dropdown overlay={userMenu} trigger={['hover']}>
                <UserOutlined style={{ cursor: 'pointer' }} />
              </Dropdown>
            </li>
            <li>
              <ShoppingCartOutlined style={{ cursor: 'pointer' }} onClick={() => navigate("/cart")} />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
