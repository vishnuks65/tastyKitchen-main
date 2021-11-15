import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import FoodCard from '../FoodCard'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantDetails extends Component {
  state = {
    productData: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProductData()
  }

  getFormattedData = data => ({
    costForTwo: data.cost_for_two,
    cuisine: data.cuisine,
    id: data.id,
    imageUrl: data.image_url,
    itemsCount: data.items_count,
    location: data.location,
    name: data.name,
    opensAt: data.opens_at,
    rating: data.rating,
    reviewsCount: data.reviews_count,
  })

  getProductData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const formattedData = {
        updatedData: this.getFormattedData(fetchedData),
        updatedFoodDetails: fetchedData.food_items.map(data => ({
          name: data.name,
          cost: data.cost,
          foodType: data.food_type,
          imageUrl: data.image_url,
          rating: data.rating,
          id: data.id,
          isActive: true,
          quantity: 0,
        })),
      }

      this.setState({
        productData: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div
      className="products-details-loader-container"
      testid="restaurant-details-loader"
    >
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="product-details-failure-view-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="failure-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="button">
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  renderProductDetailsView = () => {
    const {productData} = this.state
    const {updatedData, updatedFoodDetails} = productData
    const {
      costForTwo,
      cuisine,
      imageUrl,
      location,
      name,
      opensAt,
      rating,
      reviewsCount,
    } = updatedData

    return (
      <>
        <div className="hotel-details">
          <div className="container">
            <div>
              <img src={imageUrl} alt="restaurant" className="hotels-image" />
            </div>
            <div>
              <div className="details-container">
                <h1 className="hotel-name">{name}</h1>
                <p className="cuisine-type">{cuisine}</p>
                <p className="location">{location}</p>
              </div>
              <div className="details-container-2">
                <div>
                  <p className="opening">Opens at :{opensAt}</p>
                  <p className="cost">Rs {costForTwo}/- Cost for two</p>
                </div>
                <hr />
                <div className="rating-containers">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                    alt="star"
                    className="star"
                  />
                  <p className="ratings-details">{rating}</p>
                  <hr />
                  <p className="counts">{reviewsCount} + Ratings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="food-details-container">
          {updatedFoodDetails.map(item => (
            <FoodCard details={item} key={item.ids} />
          ))}
        </ul>
      </>
    )
  }

  renderProductDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="product-item-details-container">
          {this.renderProductDetails()}
        </div>
        <Footer />
      </>
    )
  }
}

export default RestaurantDetails
