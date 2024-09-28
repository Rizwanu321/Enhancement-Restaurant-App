import {useState} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Cart from './components/Cart'
import CartContext from './context/CartContext'
import NotFound from './components/NotFound'
import './App.css'

const App = () => {
  const [cartList, setCartList] = useState([])

  const incrementCartItemQuantity = dishId => {
    setCartList(prevState =>
      prevState.map(item =>
        item.dishId === dishId ? {...item, quantity: item.quantity + 1} : item,
      ),
    )
  }

  const removeCartItem = id => {
    const newCartList = cartList.filter(item => item.dishId !== id)
    setCartList(newCartList)
  }

  const decrementCartItemQuantity = dishId => {
    const isCheck = cartList.find(item => item.dishId === dishId)
    if (isCheck.quantity === 1) {
      removeCartItem(dishId)
    } else {
      setCartList(prevState =>
        prevState.map(item =>
          item.dishId === dishId
            ? {...item, quantity: item.quantity - 1}
            : item,
        ),
      )
    }
  }

  const removeAllCartItems = () => {
    setCartList([])
  }

  const addCartItem = item => {
    const itemExists = cartList.find(e => e.dishId === item.dishId)
    if (itemExists) {
      setCartList(prevState =>
        prevState.map(e =>
          e.dishId === item.dishId
            ? {...e, quantity: e.quantity + item.quantity}
            : e,
        ),
      )
    } else {
      setCartList(prevState => [...prevState, item])
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        removeCartItem,
        removeAllCartItems,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      }}
    >
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/cart" component={Cart} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
      </Switch>
    </CartContext.Provider>
  )
}

export default App
