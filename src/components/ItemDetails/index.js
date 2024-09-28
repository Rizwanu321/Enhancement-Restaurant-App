import {useContext, useState} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const ItemDetails = props => {
  const [quantity, setQuantity] = useState(0)
  const {item} = props
  const {cartList, addCartItem} = useContext(CartContext)
  const {
    dishId,
    dishName,
    dishType,
    dishPrice,
    dishCurrency,
    dishDescription,
    dishImage,
    dishCalories,
    addonCat,
    dishAvailability,
  } = item
  console.log(cartList)

  const onIncreaseQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const onDecreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(prev => prev - 1)
    }
  }

  const renderButton = () => (
    <div className="btn-add-container">
      <div className="btn-container">
        <button
          className="button"
          type="button"
          data-testid="minus"
          onClick={onDecreaseQuantity}
        >
          -
        </button>
        <p className="count">{quantity}</p>
        <button
          className="button"
          type="button"
          data-testid="plus"
          onClick={onIncreaseQuantity}
        >
          +
        </button>
      </div>
      {quantity >= 1 && dishAvailability ? (
        <button
          type="button"
          className="btn-cart add-to-cart-btn"
          data-testid="add-to-cart-btn"
          onClick={() => addCartItem({...item, quantity})}
        >
          ADD TO CART
        </button>
      ) : (
        ''
      )}
    </div>
  )
  return (
    <li className="list-item-container">
      <div className="Item-details-container">
        <div className={`border-type ${dishType === 1 ? 'border-1' : ''}`}>
          <div className={`round-type ${dishType === 1 ? 'round-1' : ''}`} />
        </div>
        <div className="item-details">
          <h1 className="item-name">{dishName}</h1>
          <p className="item-price">
            {dishCurrency} {dishPrice}
          </p>
          <p className="item-description">{dishDescription}</p>
          {dishAvailability && renderButton()}
          {!dishAvailability && <p className="not-availabile">Not available</p>}
          {addonCat.length !== 0 && (
            <p className="addon">Customizations available</p>
          )}
        </div>
      </div>

      <p className="item-calories">{dishCalories} calories</p>
      <img className="item-image" alt={dishName} src={dishImage} />
    </li>
  )
}

export default ItemDetails
