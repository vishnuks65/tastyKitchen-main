import {Link, withRouter} from 'react-router-dom'
import {useState} from 'react'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import CartContext from '../../context/CartContext'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const renderCartItemsCount = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartListCount = cartList.length
        return (
          <>
            {cartListCount > 0 ? (
              <span className="cart-count-badge">{cartListCount}</span>
            ) : null}
          </>
        )
      }}
    </CartContext.Consumer>
  )

  const [isMobile, setIsMobile] = useState(false)
  return (
    <nav className="navbar">
      <Link to="/">
        <div className="logo-container">
          <img
            src="https://res.cloudinary.com/dzbdfvh3b/image/upload/v1634233491/Frame_274logo_ja9vsc.png"
            alt="website logo"
            className="logo"
          />
          <h1 className="logo-names">Tasty Kitchens</h1>
        </div>
      </Link>
      <ul
        className={isMobile ? 'nav-links-mobile' : 'nav-links'}
        onClick={() => setIsMobile(false)}
      >
        <li className="nav-menu-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-menu-item">
          <Link to="/cart" className="nav-link cart-text">
            Cart
            {renderCartItemsCount()}
          </Link>
        </li>

        <li className="nav-menu-item">
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </li>
      </ul>
      <button
        type="button"
        className="mobile-menu-icon"
        onClick={() => setIsMobile(!isMobile)}
      >
        {isMobile ? (
          <h1>
            <AiFillCloseCircle />
          </h1>
        ) : (
          <h1>
            <GiHamburgerMenu />
          </h1>
        )}
      </button>
    </nav>
  )
}
export default withRouter(Header)
