import axios from 'axios';

function Register() {
  return (
    <form>
      <h1>Register</h1>
      <input type="text" placeholder="Enter your desired username" />
      <input type="email" placeholder="Enter your desired email address" />
      <input type="password" placeholder="Enter your desired password" />
      <button>Submit</button>
    </form>
  )
}

export default Register;