import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useLogin } from '../hooks/useLogin';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';

const Login: React.FC = () => {
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
    <div className="login-container">
      <Form onSubmit={handleSubmit} className="shadow p-4 bg-white rounded">
        <div className="h4 mb-2 text-center">Sign In</div>

        {/* Mensaje de error si la autenticación falla */}
        {showError && (
          <Alert variant="danger" dismissible onClose={() => setShowError(false)}>
            Incorrect username or password.
          </Alert>
        )}

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

        {/* Botón de inicio de sesión */}
        <Button variant="primary" type="submit" disabled={loginMutation.status === 'pending'}>
          {loginMutation.status === 'pending' ? 'Logging In...' : 'Log In'}
        </Button>
      </Form>
    </div>
  );
};

export default Login;
