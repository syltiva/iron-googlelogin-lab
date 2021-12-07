
import './App.css';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import GoogleButton from './components/GoogleButton';


function App() {
  const {user, setUser, loginUser} = useContext(AuthContext);

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await loginUser(user);
  }
  return (
    <div className="App form-control">
      <form className="form">
        <h2>Login View</h2>
          <input
            name="email"
            value={user.email}
            onChange={handleChange}
            className="form-control"
            type="text"
            placeholder="email"
            /><br/>
            <input
              name="password"
              value={user.password}
              onChange={handleChange}
              className="form-control"
              type="password"
              placeholder="password"
              /><br/>
              <button
                onClick={handleSubmit}
                className="btn btn-outline-dark form-control">
                  Log In
                </button><br/>
                <GoogleButton/>
      </form>

    </div>
  );
}

export default App;
