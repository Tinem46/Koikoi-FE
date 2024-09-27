import './index.scss';

function Footer() {
  return (
    <footer className="footer">
    <div className="footerContent">
      <div className="footerColumns">
        <div className="footerColumn brandSection">
          <h2 className="logoText">Exclusive</h2>
          <h3 className="subscribeTitle">Subscribe</h3>
          <p className="offerText">Get 10% off your first order</p>
          <form className="emailForm">
            <input type="email" placeholder="Enter your email" className="emailInput" />
            <button type="submit" className="submitIcon">
              {/* Add submit icon */}
            </button>
          </form>
        </div>
        <div className="footerColumn">
          <h3 className="columnTitle">Support</h3>
          <ul className="columnList">
            <li className="columnItem">111 Bijoy sarani, Dhaka,</li>
            <li className="columnItem">DH 1515, Bangladesh.</li>
            <li className="columnItem">exclusive@gmail.com</li>
            <li className="columnItem">+88015-88888-9999</li>
          </ul>
        </div>
        <div className="footerColumn">
          <h3 className="columnTitle">Account</h3>
          <ul className="columnList">
            <li className="columnItem">My Account</li>
            <li className="columnItem">Login / Register</li>
            <li className="columnItem">Cart</li>
            <li className="columnItem">Wishlist</li>
            <li className="columnItem">Shop</li>
          </ul>
        </div>
        <div className="footerColumn">
          <h3 className="columnTitle">Quick Link</h3>
          <ul className="columnList">
            <li className="columnItem">Privacy Policy</li>
            <li className="columnItem">Terms Of Use</li>
            <li className="columnItem">FAQ</li>
            <li className="columnItem">Contact</li>
          </ul>
        </div>
      </div>
      <div className="socialIcons">
        {/* Add social media icons */}
      </div>
    </div>
    <div className="copyright">
      <span className="copyrightIcon">&copy;</span>
      <span className="copyrightText">Copyright Rimel 2024. All right reserved</span>
    </div>
  </footer>
  );
}

export default Footer;