import {useState, useEffect} from 'react'
import './index.css'
import Cookies from 'js-cookie'

const Login = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const {history} = props

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  useEffect(() => {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      history.replace('/')
    }
  }, [history])

  const onSubmitFailure = err => {
    setError(err)
  }

  const onSubmitForm = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }
  return (
    <div className="login-container">
      <form className="login-home-container" onSubmit={onSubmitForm}>
        <h1 className="header-name-login">UNI Resto Cafe</h1>
        <div className="input-field-container">
          <label htmlFor="username" className="username">
            USERNAME
          </label>
          <input
            id="username"
            type="text"
            className="text-field"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="input-field-container">
          <label htmlFor="password" className="username">
            PASSWORD
          </label>
          <input
            id="password"
            type={'password'}
            className="text-field"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="login-btn" data-testid="loginButton">
          Login
        </button>
        {error && <p className="err-msg">{error}</p>}
      </form>
    </div>
  )
}

export default Login
