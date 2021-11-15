import CartContext from '../../context/CartContext'
import Header from '../Header'
import EmptyCartView from '../EmptyCartView'
import CartItem from '../CartItem'

import './index.css'
import Footer from '../Footer'

const Cart = props => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length
      const onClickRemoveAllBtn = () => {
        removeAllCartItems()
      }
      const onClickPlaceOrder = () => {
        removeAllCartItems()
        const {history} = props
        history.replace('/payment-page')
      }
      let totalOrderCost = 0
      cartList.forEach(eachCartItem => {
        totalOrderCost += eachCartItem.cost * eachCartItem.quantity
      })

      return (
        <>
          <Header />
          {showEmptyView === 0 ? (
            <EmptyCartView />
          ) : (
            <div className="cart-container">
              <div className="cart-content-container">
                <button
                  type="button"
                  className="remove-all-btn"
                  onClick={onClickRemoveAllBtn}
                >
                  Remove All
                </button>

                <ul testid="cartItem" className="cart-list">
                  {cartList.map(eachCartItem => (
                    <CartItem
                      cartItemDetails={eachCartItem}
                      key={eachCartItem.id}
                    />
                  ))}
                </ul>

                <div className="cart-summary-container">
                  <h1 className="order-total-label">Order Total:</h1>
                  <div className="value-container">
                    <p testid="total-price" className="order-total-value">
                      total order cost = Rs {totalOrderCost}
                      /-
                    </p>
                    <p className="total-items">
                      {cartList.length} Items in cart
                    </p>

                    <button
                      type="button"
                      className="checkout-button"
                      onClick={onClickPlaceOrder}
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <Footer />
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
