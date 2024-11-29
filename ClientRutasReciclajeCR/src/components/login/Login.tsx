import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useLogin } from '../../hooks/useLogin';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice/authSlice';

import "../../styles/Login.css";

import BackgroundImage from "../../assets/images/background.png";
import Logo from "../../assets/images/logo.png";

export const Login: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);

  const dispatch = useDispatch();
  const loginMutation = useLogin(); // Aquí llamas al hook useLogin

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowError(false);

    // Ejecuta la mutación para hacer login
    loginMutation.mutate(
      { userName, password },
      {
        onSuccess: (data) => {
          if (data.success) {
            dispatch(login({ token: data.token, userName: data.name }));
          } else {
            setShowError(true);
          }
        },
        onError: () => {
          setShowError(true);
        },
      }
    );
  };

  return (
    <div
      className="sign-in__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      {/* Overlay */}
      <div className="sign-in__backdrop"></div>

      {/* Form */}
      <Form onSubmit={handleSubmit} className="shadow p-4 bg-white rounded">
        {/* Header */}
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={Logo}
          alt="logo"
        />
        <div className="h4 mb-2 text-center">Sign In</div>

        {/* Mensaje de error si la autenticación falla */}
        {showError && (
          <Alert variant="danger" dismissible onClose={() => setShowError(false)}>
            Incorrect username or password.
          </Alert>
        )}

        {/* Username */}
        <Form.Group controlId="username" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </Form.Group>

        {/* Password */}
        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </Form.Group>

        {/* Remember Me Checkbox */}
        <Form.Group controlId="checkbox" className="mb-3">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>

        {/* Log In Button */}
        <Button variant="primary" type="submit" className="w-100" disabled={loginMutation.status === 'pending'}>
          {loginMutation.status === 'pending' ? 'Logging In...' : 'Log In'}
        </Button>

        {/* Forgot Password Link */}
        <div className="d-grid justify-content-end">
          <Button
            className="text-muted px-0"
            variant="link"
            onClick={() => {
              // Manejo del clic para olvidar contraseña (puedes ajustar esta función)
            }}
          >
            Forgot password?
          </Button>
        </div>
      </Form>

      {/* Footer */}
      <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
        molinaja | &copy;2024
      </div>
    </div>
  );
};


