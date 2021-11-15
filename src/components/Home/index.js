import {Component} from 'react'
import Slider from 'react-slick'
import {Redirect, Link} from 'react-router-dom'
import {BiChevronRightSquare, BiChevronLeftSquare} from 'react-icons/bi'
import {BsSearch, BsFilterRight} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class Home extends Component {
  state = {
    productsList: [],
    selectedSortByValue: sortByOptions[1].displayText,
    searchInput: '',
    activePage: 1,
    productsView: apiStatusConstants.initial,
    apiStatus: apiStatusConstants.initial,
    images: [],
  }

  componentDidMount() {
    this.getProducts()
    this.getImages()
  }
  /* slider section */

  getImages = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.offers.map(product => ({
        id: product.id,
        imageUrl: product.image_url,
      }))
      this.setState({
        images: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="restaurants-offers-loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderImagesFailureView = () => {
    this.setState({apiStatus: apiStatusConstants.failure})
  }

  renderImagesList = () => {
    const {images} = this.state
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true,
    }

    return (
      <ul className="slider-container">
        <Slider {...settings}>
          {images.map(items => (
            <li key={items.id}>
              <img src={items.imageUrl} alt="offer" className="slider-image" />
            </li>
          ))}
        </Slider>
      </ul>
    )
  }

  getSliderView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderImagesList()
      case apiStatusConstants.failure:
        return this.renderImagesFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  /* end of slider section */

  onChangeSortby = event => {
    this.setState({selectedSortByValue: event.target.value}, this.getProducts)
  }

  clearFilters = () => {
    this.setState(
      {
        searchInput: '',
      },
      this.getProducts,
    )
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getProducts()
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onIncrement = () => {
    this.setState(
      prevState => ({
        activePage:
          prevState.activePage < 4
            ? prevState.activePage + 1
            : prevState.activePage,
      }),
      this.getProducts,
    )
  }

  onDecrement = () => {
    this.setState(
      prevState => ({
        activePage:
          prevState.activePage > 1
            ? prevState.activePage - 1
            : prevState.activePage,
      }),
      this.getProducts,
    )
  }

  ProductCard = product => {
    const {
      imageUrl,
      name,
      cuisine,
      menuType,
      rating,
      totalReviews,
      id,
    } = product

    return (
      <li key={id} testid="restaurant-item" className="product-item">
        <Link to={`/restaurant/${id}`} className="link-item">
          <div className="image">
            <img src={imageUrl} alt="restaurant" className="thumbnail" />
          </div>
          <div className="details">
            <h1 className="title">{name}</h1>
            <p className="brand">{cuisine}</p>
            <div className="product-details">
              <p className="price">{menuType}</p>
              <div className="rating-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star"
                />
                <p className="rating">{rating}</p>
                <p className="rating-count">({totalReviews})</p>
              </div>
            </div>
          </div>
        </Link>
      </li>
    )
  }

  getProducts = async () => {
    this.setState({
      productsView: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {selectedSortByValue, searchInput, activePage} = this.state
    const offset = (activePage - 1) * 9
    const apiUrl = `https://apis.ccbp.in/restaurants-list?sort_by_rating=${selectedSortByValue}&offset=${offset}&limit=9&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.restaurants.map(product => ({
        costForTwo: product.cost_for_two,
        cuisine: product.cuisine,
        groupByName: product.group_by_time,
        hasOnlineDelivery: product.has_online_delivery,
        hasTableBooking: product.has_table_booking,
        id: product.id,
        imageUrl: product.image_url,
        isDeliveringNow: product.is_delivering_now,
        location: product.location,
        menuType: product.menu_type,
        name: product.name,
        opensAt: product.opens_at,
        rating: product.user_rating.rating,
        ratingColor: product.user_rating.rating_color,
        ratingText: product.user_rating.rating_text,
        totalReviews: product.user_rating.total_reviews,
      }))
      this.setState({
        productsList: updatedData,
        productsView: apiStatusConstants.success,
      })
    } else {
      this.setState({
        productsView: apiStatusConstants.failure,
      })
    }
  }

  renderProductsListView = () => {
    const {productsList, selectedSortByValue, activePage} = this.state
    const shouldShowProductsList = productsList.length > 0

    return shouldShowProductsList ? (
      <div className="all-products-container">
        <div className="products-header">
          <div className="sort-by-container">
            <BsFilterRight className="sort-by-icon" />
            <p className="sort-by">Sort by</p>
            <select
              className="sort-by-select"
              value={selectedSortByValue}
              onChange={this.onChangeSortby}
            >
              {sortByOptions.map(eachOption => (
                <option
                  key={eachOption.id}
                  value={eachOption.value}
                  className="select-option"
                >
                  {eachOption.displayText}
                </option>
              ))}
            </select>
          </div>
        </div>
        <ul className="products-list">
          {productsList.map(product => this.ProductCard(product))}
        </ul>
        <div className="page-container">
          <button
            type="button"
            testid="pagination-left-button"
            className="button1"
            onClick={this.onDecrement}
          >
            <BiChevronLeftSquare />
          </button>
          <span testid="active-page-number" className="button-name">
            {activePage} of 4
          </span>
          <button
            type="button"
            testid="pagination-right-button"
            className="button1"
            onClick={this.onIncrement}
          >
            <BiChevronRightSquare />
          </button>
        </div>
      </div>
    ) : (
      <div className="no-products-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          className="no-products-img"
          alt="no products"
        />
        <h1 className="no-products-heading">No Products Found</h1>
        <p className="no-products-description">
          We could not find any products. Try other filters.
        </p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container" testid="restaurants-list-loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  renderAllProducts = () => {
    const {productsView} = this.state

    switch (productsView) {
      case apiStatusConstants.success:
        return this.renderProductsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <>
        <Header />
        <div className="home-container">
          {this.getSliderView()}

          <div className="home-content">
            <h1 className="home-heading">Popular Restaurants</h1>
            <p className="home-description">
              Select Your favourite restaurant special dish and make your day
              happy...
            </p>
          </div>
          <hr className="line" />
          <div className="all-products-section">
            <div className="filters-group-container">
              <div className="search-input-container">
                <input
                  value={searchInput}
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  onChange={this.onChangeSearchInput}
                  onKeyDown={this.onEnterSearchInput}
                />
                <BsSearch className="search-icon" />
              </div>
              <button
                type="button"
                className="clear-filters-btn"
                onClick={this.clearFilters}
              >
                Clear
              </button>
            </div>
          </div>
          {this.renderAllProducts()}
        </div>
        <Footer />
      </>
    )
  }
}
export default Home
