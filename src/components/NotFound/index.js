import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dzbdfvh3b/image/upload/v1635684321/Group_jer6tc.png"
        alt="not found"
        className="not-found-img"
      />
      <h1 className="notFound-title">Page Not Found</h1>
      <p className="notFound-paragraph">
        we are sorry, the page you requested could not be found
      </p>
      <Link to="/">
        <button type="button" className="notfound-button">
          Home Page
        </button>
      </Link>
    </div>
  </>
)

export default NotFound
