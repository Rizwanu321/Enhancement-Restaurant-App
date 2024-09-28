import {useContext} from 'react'
import CartContext from '../../context/CartContext'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import './index.css'

const Header = props => {
  const {history, title} = props
  const {cartList} = useContext(CartContext)

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  const headTitle = title ? title : 'UNI Resto Cafe'
  const getCount = () => cartList.length
  return (
    <nav className="head-container">
      <Link to="/" className="navlink">
        <h1 className="head-name">{headTitle}</h1>
      </Link>
      <div className="order-container">
        <p className="order">My Orders</p>
        <div>
          <Link to="/cart" className="navlink">
            <button
              className="cartt-container"
              type="button"
              data-testid="cart"
            >
              <AiOutlineShoppingCart size={30} color="#534343" />
            </button>
          </Link>
          <span className="item-count">{getCount()}</span>
        </div>
        <button
          className="logout-btn"
          type="button"
          data-testid="logoutButton"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
