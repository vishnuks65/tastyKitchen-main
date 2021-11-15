import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Cart from './components/Cart'
import Login from './components/Login'
import Home from './components/Home'

import RestaurantDetails from './components/RestaurantDetails'

import PaymentPage from './components/PaymentPage'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
    localStorage.removeItem('cartData')
  }

  incrementCartItemQuantity = id => {
    const Data = localStorage.getItem('cartData')
    const parsedData = JSON.parse(Data)
    const newData = parsedData.map(eachCartItem => {
      if (id === eachCartItem.id) {
        const updatedQuantity = eachCartItem.quantity + 1
        return {...eachCartItem, quantity: updatedQuantity}
      }
      return eachCartItem
    })
    localStorage.setItem('cartData', JSON.stringify(newData))
    this.setState({cartList: newData})
  }

  decrementCartItemQuantity = id => {
    const Data = localStorage.getItem('cartData')
    const parsedData = JSON.parse(Data)

    const productObject = parsedData.find(
      eachCartItem => eachCartItem.id === id,
    )
    if (productObject.quantity > 1) {
      const newData = parsedData.map(eachCartItem => {
        if (id === eachCartItem.id) {
          const updatedQuantity = eachCartItem.quantity - 1
          return {...eachCartItem, quantity: updatedQuantity}
        }
        return eachCartItem
      })
      localStorage.setItem('cartData', JSON.stringify(newData))
      this.setState({cartList: newData})
    } else {
      this.removeCartItem(id)
    }
  }

  removeCartItem = id => {
    const Data = localStorage.getItem('cartData')
    const parsedData = JSON.parse(Data)

    const updatedCartList = parsedData.filter(
      eachCartItem => eachCartItem.id !== id,
    )
    localStorage.setItem('cartData', JSON.stringify(updatedCartList))
    this.setState({cartList: updatedCartList})
  }

  addCartItem = item => {
    const {cartList} = this.state
    const productObject = cartList.find(
      eachCartItem => eachCartItem.id === item.id,
    )

    if (productObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (productObject.id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity + item.quantity

            return {...eachCartItem, quantity: updatedQuantity}
          }

          return eachCartItem
        }),
      }))
    } else {
      const updatedCartList = [...cartList, item]
      localStorage.setItem('cartData', JSON.stringify(updatedCartList))
      this.setState({cartList: updatedCartList})
    }
  }

  render() {
    // const {cartList} = this.state
    const data = localStorage.getItem('cartData')
    if (data === null) {
      localStorage.setItem('cartData', JSON.stringify([]))
    }
    const parsedData = JSON.parse(localStorage.getItem('cartData'))

    return (
      <CartContext.Provider
        value={{
          cartList: parsedData,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/restaurant/:id"
            component={RestaurantDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute exact path="/payment-page" component={PaymentPage} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}
export default App
