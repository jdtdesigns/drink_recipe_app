import { useState } from 'react';
// import the mutation hook and gql tool to call a server side mutation
import { useMutation, gql } from '@apollo/client';

// const REGISTER_USER = gql`
//   mutation Register($username: String!, $email: String!, $password: String!) {
//     register(username: $username, email: $email, password: $password) {
//       _id
//       username
//       email
//       blah
//     }
//   }
// `;

function Register({ setUser }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  // const [registerUser] = useMutation(REGISTER_USER);

  const handleInputChange = (e) => {
    const prop = e.target.name;

    setFormData({
      ...formData,
      [prop]: e.target.value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const { data: { register: user } } = await registerUser({
      //   variables: formData
      // });

      setUser(user);
      setErrorMessage('');
    } catch (err) {
      setErrorMessage(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>

      {errorMessage && <p className="error">{errorMessage}</p>}

      <input
        name="username"
        onChange={handleInputChange}
        value={formData.username}
        type="text"
        placeholder="Enter your desired username" />
      <input
        name="email"
        onChange={handleInputChange}
        value={formData.email}
        type="email"
        placeholder="Enter your desired email address" />
      <input
        name="password"
        onChange={handleInputChange}
        value={formData.password}
        type="password"
        placeholder="Enter your desired password" />
      <button>Submit</button>
    </form>
  )
}

export default Register;