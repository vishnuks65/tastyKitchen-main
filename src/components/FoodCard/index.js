import {Component} from 'react'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import CartContext from '../../context/CartContext'
import './index.css'

class FoodCard extends Component {
  constructor(props) {
    super()
    this.state = {
      quantity: 0,
      data: props.details,
    }
  }

  render = () => (
    <CartContext.Consumer>
      {value => {
        const {
          addCartItem,
          incrementCartItemQuantity,
          decrementCartItemQuantity,
        } = value
        const {data, quantity} = this.state
        const {imageUrl, name, cost, foodType, rating, id, isActive} = data
        if (quantity < 1) {
          this.setState({quantity: 1})
          data.isActive = true
        } else if (quantity > 1) {
          data.isActive = false
        }
        console.log(data.isActive)
        const onClickAddToCart = () => {
          addCartItem({...data, quantity})
          data.isActive = false
        }
        const onIncrement = () => {
          this.setState(prevState => ({quantity: prevState.quantity + 1}))
          incrementCartItemQuantity(id)
        }

        const onDecrement = () => {
          this.setState(prevState => ({quantity: prevState.quantity - 1}))
          decrementCartItemQuantity(id)
        }

        return (
          <li key={id} testid="foodItem" className="row-container">
            <div className="photos">
              <img src={imageUrl} alt="foods" className="food-image" />
            </div>
            <div className="row-details">
              <h1 className="dish-heading">{name}</h1>
              <p className="prices">
                <span>Rs </span>
                {cost}
              </p>
              <div className="third-row">
                <div>
                  <p className="dish-type">{foodType}</p>
                </div>
                <div className="containers">
                  <div className="rating-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                      alt="star"
                      className="star"
                    />
                    <p className="rating-detail">{rating}</p>
                  </div>
                </div>
              </div>

              {isActive ? (
                <button
                  type="button"
                  className="button add-to-cart-btn"
                  onClick={onClickAddToCart}
                >
                  ADD
                </button>
              ) : (
                <div className="cart-details">
                  <div className="quantity-container">
                    <p className="quantity">
                      <div className="quantity-container">
                        <button
                          type="button"
                          className="quantity-controller-button"
                          onClick={onDecrement}
                          testid="decrement-count"
                        >
                          <BsDashSquare className="quantity-controller-icon" />
                        </button>
                        <div className="quantity" testid="active-count">
                          {quantity}
                        </div>
                        <button
                          type="button"
                          className="quantity-controller-button"
                          onClick={onIncrement}
                          testid="increment-count"
                        >
                          <BsPlusSquare className="quantity-controller-icon" />
                        </button>
                      </div>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default FoodCard
