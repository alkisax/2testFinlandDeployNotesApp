import loginService from '../services/login'
import noteService from '../services/notes'

  const LoginForm = ({ 
    // handleLogin,
    setUser,
    username, 
    password, 
    setUsername, 
    setPassword, 
    setErrorMessage
  }) => {

    const handleLogin = async (event) => {
      event.preventDefault()
      try {
        const user = await loginService.login({
          username, password,
        })
  
        window.localStorage.setItem(
          'loggedNoteappUser', JSON.stringify(user)
        ) 
        noteService.setToken(user.token)
        setUser(user)
        setUsername('')
        setPassword('')
      } catch (exception) {
        setErrorMessage(`Wrong credentials, ${exception.message}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }  
    }

    return (
      <div>
          <h2>Login</h2>
          
          <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
              autoComplete="username"
            />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
              autoComplete="current-password"
            />
          </div>
          <br />
          <button type="submit">login</button>
        </form> 
      </div>
    )     
  }

  export default LoginForm