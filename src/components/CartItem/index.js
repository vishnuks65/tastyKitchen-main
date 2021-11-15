import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value
      const {cartItemDetails} = props
      const {name, quantity, cost, imageUrl, id} = cartItemDetails
      const onClickDecrement = () => {
        decrementCartItemQuantity(id)
      }
      const onClickIncrement = () => {
        incrementCartItemQuantity(id)
      }

      const onRemoveCartItem = () => {
        removeCartItem(id)
      }

      return (
        <li className="list-style" key={id}>
          <div className="cart-item" testid="cartItem">
            <div>
              <img src={imageUrl} className="cart-product-image" alt={name} />
            </div>
            <div className="cart-item-details-container">
              <div className="cart-product-title-brand-container">
                <h1 className="cart-product-title">{name}</h1>
              </div>
              <div className="cart-quantity-container">
                <button
                  type="button"
                  className="quantity-controller-button"
                  testid="decrement-quantity"
                  onClick={onClickDecrement}
                >
                  <BsDashSquare color="#52606D" size={12} />
                </button>
                <p className="cart-quantity" testid="item-quantity">
                  {quantity}
                </p>
                <button
                  type="button"
                  className="quantity-controller-button"
                  testid="increment-quantity"
                  onClick={onClickIncrement}
                >
                  <BsPlusSquare color="#52606D" size={12} />
                </button>
              </div>
              <div className="total-price-delete-container">
                <p className="cart-total-price" testId="total-price">
                  Rs {cost * quantity}/-
                </p>
                <button
                  className="remove-button"
                  type="button"
                  onClick={onRemoveCartItem}
                >
                  Remove
                </button>
              </div>
            </div>
            <button
              className="delete-button"
              type="button"
              onClick={onRemoveCartItem}
            >
              <AiFillCloseCircle color="#616E7C" size={20} />
            </button>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
