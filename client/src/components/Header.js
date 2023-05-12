import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function Header({ user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location)

  const logout = async e => {
    e.preventDefault();

    await axios.get('/auth/logout');

    setUser(null);
    navigate('/');
  };

  return (
    <header>
      <NavLink className="logo" to="/">
        <h3>&#127864; Drink Recipe App</h3>
      </NavLink>

      <nav>
        {!user ? (
          <>
            <NavLink to="/login">Login</NavLink>
            <span>or</span>
            <NavLink to="/register">Register</NavLink>
          </>
        ) : (
          <>
            <span>{user.email}</span>
            {location.pathname !== 'dashboard' && <NavLink to="/dashboard">Dashboard</NavLink>}
            <NavLink onClick={logout} to="/auth/logout">Log Out</NavLink>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header