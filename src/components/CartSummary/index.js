import {useContext} from 'react'
import './index.css'
import CartContext from '../../context/CartContext'

const CartSummary = () => {
  const {cartList} = useContext(CartContext)
  const total = cartList.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.quantity * currentItem.dishPrice
  }, 0)
  return (
    <div className="summary-container">
      <div className="total-container">
        <h1 className="order-total-heading">
          Order Total: <span className="total-rs">Rs: {total}</span>
        </h1>
        <p className="items-carts">{cartList.length} items in cart</p>
      </div>
      <button className="checkout-btn">Checkout</button>
    </div>
  )
}

export default CartSummary
