import {
  FaFacebookSquare,
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
} from 'react-icons/fa'
import './index.css'

export default function Footer() {
  return (
    <div className="footer">
      <div className="heading">
        <img
          src="https://res.cloudinary.com/dzbdfvh3b/image/upload/v1635078073/Group_7420_n4yox2.png"
          alt="website-footer-logo"
          className="logo1"
        />
        <h1 className="logo-heading">Tasty Kitchens </h1>
      </div>
      <p className="footer-text">
        The only thing we are serious about is food. Contact us on
      </p>
      <div className="media-logo">
        <i className="logos" testid="pintrest-social-icon">
          <FaPinterestSquare />
        </i>
        <i className="logos" testid="instagram-social-icon">
          <FaInstagram />
        </i>
        <i className="logos" testid="twitter-social-icon">
          <FaTwitter />
        </i>
        <i className="logos" testid="facebook-social-icon">
          <FaFacebookSquare />
        </i>
      </div>
    </div>
  )
}
