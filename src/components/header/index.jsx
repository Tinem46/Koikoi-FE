import "./index.scss";
import { UserOutlined, SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import logo from "../../assets/image/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/userSlice";
import { Dropdown, Input} from "antd";


function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isLoggedIn = user ? user.isLoggedIn : false;
  const cart = useSelector((store) => store.cart.products); // Ensure you are selecting the correct part of the state
  console.log(cart)

  const userMenu = (
    <ul className="header__dropdown-menu">
      {isLoggedIn && <li onClick={handleProfile}>Profile</li>} 
      {isLoggedIn ? (
        <>
          <li onClick={handleLogout}>Logout</li>
        </>
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

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.header');
      if (window.scrollY > 0) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className="header" >
      <div className="header__logo" onClick={() => navigate("/")}>
        <img src={logo} alt="logo" width={120} />
      </div>
      <nav className="header__nav">
        <div className="header__nav-center">
          <ul>
            <li onClick={() => navigate("/")} className="header__home-link">
              Home
            </li>
            <li onClick={() => navigate("/FishShop")}>Fish</li>
            <li onClick={() => navigate("/consignment")}>Consignment</li>
            <li onClick={() => navigate("/about-us")}>About Us</li>
          </ul>
        </div>
        <div className="header__nav-right">
          <ul>
            <li>
              <div className="search-bar">
                <Input type="text" placeholder="Tìm kiếm..." suffix={<SearchOutlined style={{ cursor: 'pointer' }} />}/>
              </div>
            </li>
            <li>
              <Dropdown overlay={userMenu} trigger={['hover']}>
                <UserOutlined style={{ cursor: 'pointer' }} />
              </Dropdown>
            </li>
            <li>
              <ShoppingCartOutlined style={{ cursor: 'pointer' }} onClick={() => navigate("/cart")} />
              <span className="cart-count">{cart.length}</span>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
