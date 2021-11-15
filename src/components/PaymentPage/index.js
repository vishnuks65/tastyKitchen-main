import {Link} from 'react-router-dom'
import CartContext from '../../context/CartContext'
import Header from '../Header'
import './index.css'

// eslint-disable-next-line arrow-body-style
const PaymentPage = () => (
  <CartContext.Consumer>
    {value => {
      const {removeAllCartItems} = value
      const onClickRemoveAllBtn = () => {
        removeAllCartItems()
      }
      return (
        <>
          <Header />
          <div className="main-container">
            <div className="payment-container">
              <img
                src="https://res.cloudinary.com/dzbdfvh3b/image/upload/v1635667422/Vector_eejgts.png"
                className="tick-image"
                alt="tick"
              />
              <h1 className="payment-title">Payment Successful</h1>
              <p className="details-first">
                Thank you for ordering Your payment is successfully completed.
              </p>
              <Link to="/">
                <button
                  type="button"
                  className="payment-home"
                  onClick={onClickRemoveAllBtn}
                >
                  Go To Home Page
                </button>
              </Link>
            </div>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default PaymentPage
