import "./Footer.css";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="flipkart-footer">

      <div className="footer-top">

        <div className="footer-col">
          <h4>ABOUT</h4>
          <p>Contact Us</p>
          <p>About Us</p>
          <p>Careers</p>
          <p>Press</p>
          <p>Corporate Information</p>
        </div>

        <div className="footer-col">
          <h4>GROUP COMPANIES</h4>
          <p>Myntra</p>
          <p>Cleartrip</p>
          <p>Shopsy</p>
        </div>

        <div className="footer-col">
          <h4>HELP</h4>
          <p>Payments</p>
          <p>Shipping</p>
          <p>Cancellation & Returns</p>
          <p>FAQ</p>
        </div>

        <div className="footer-col">
          <h4>CONSUMER POLICY</h4>
          <p>Cancellation & Returns</p>
          <p>Terms Of Use</p>
          <p>Security</p>
          <p>Privacy</p>
          <p>Sitemap</p>
        </div>

        <div className="footer-col footer-contact">
          <h4>Mail Us:</h4>
          <p>
            BuyKart Internet Private Limited,<br/>
            Tech Park, Bengaluru,<br/>
            Karnataka, India
          </p>

          <div className="footer-social">
            <FaFacebook/>
            <FaXTwitter/>
            <FaYoutube/>
            <FaInstagram/>
          </div>
        </div>

        <div className="footer-col footer-contact">
          <h4>Registered Office Address:</h4>
          <p>
            BuyKart Internet Private Limited,<br/>
            Bengaluru 560103,<br/>
            Karnataka, India
          </p>
          <p>Telephone: 044-12345678</p>
        </div>

      </div>


      <div className="footer-bottom">

        <div>Become a Seller</div>
        <div>Advertise</div>
        <div>Gift Cards</div>
        <div>Help Center</div>

        <div className="copyright">
          © 2026 BuyKart.com
        </div>

      </div>

    </footer>
  );
}

export default Footer;