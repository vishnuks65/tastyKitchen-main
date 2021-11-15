import {Link} from 'react-router-dom'
import './index.css'

const Cart = () => (
  <>
    <div className="cart-container">
      <img
        alt="empty cart"
        src="https://res.cloudinary.com/dzbdfvh3b/image/upload/v1635165436/OBJECTS_i3bdsl.png"
        className="cart-img"
      />
      <h1 className="cart-heading">No Order Yet!</h1>
      <p className="cart-paragraph">
        Your cart is empty. Add something from the menu.
      </p>
      <Link to="/" className="nav-button" test id="Order Now">
        <button type="button" className="order-now">
          Order Now
        </button>
      </Link>
    </div>
  </>
)

export default Cart
