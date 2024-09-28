import {useContext} from 'react'
import {AiFillCloseCircle} from 'react-icons/ai'
import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = props => {
  const {removeCartItem, incrementCartItemQuantity, decrementCartItemQuantity} =
    useContext(CartContext)
  const {cartItemDetails} = props
  const {dishId, dishName, dishCurrency, quantity, dishPrice, dishImage} =
    cartItemDetails

  return (
    <li className="cart-item">
      <img className="cart-product-image" src={dishImage} alt={dishName} />
      <div className="cart-item-details-container">
        <div className="cart-product-title-brand-container">
          <h1 className="cart-product-title">{dishName}</h1>
          <p className="item-price-curr">
            {dishCurrency} {dishPrice}
          </p>
        </div>
        <div className="cart-quantity-container">
          <button
            type="button"
            className="quantity-controller-button"
            onClick={() => decrementCartItemQuantity(dishId)}
            data-testid="minus-btn"
          >
            -
          </button>
          <p className="cart-quantity">{quantity}</p>
          <button
            type="button"
            className="quantity-controller-button"
            onClick={() => incrementCartItemQuantity(dishId)}
            data-testid="plus-btn"
          >
            +
          </button>
        </div>
        <div className="total-price-remove-container">
          <p className="cart-total-price">
            {dishCurrency} {dishPrice * quantity}/-
          </p>
          <button
            className="remove-button"
            type="button"
            onClick={() => removeCartItem(dishId)}
          >
            Remove
          </button>
        </div>
      </div>
      <button
        className="delete-button"
        type="button"
        onClick={() => removeCartItem(dishId)}
        data-testid="remove"
      >
        <AiFillCloseCircle color="#616E7C" size={20} />
      </button>
    </li>
  )
}

export default CartItem
