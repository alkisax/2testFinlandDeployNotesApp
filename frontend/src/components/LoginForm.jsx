  const LoginForm = ({ 
    handleLogin, 
    username, 
    password, 
    setUsername, 
    setPassword, 
  }) => {

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