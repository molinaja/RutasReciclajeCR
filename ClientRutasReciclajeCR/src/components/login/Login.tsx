import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { useHandleLoginSubmit } from '../../hooks/login/useHandleLoginSubmit';

import "../../styles/Login.css";
import BackgroundImage from "../../assets/images/background.png";
import Logo from "../../assets/images/logo.png";

const validationSchema = Yup.object({
  userName: Yup.string()
    //.max(20, 'El nombre de usuario debe tener un maximo de 20 caracteres')
    .required('El usuario es requerido'),
  password: Yup.string()
    // .min(6,'La clave debe tener al menos un largo de 6')
    // .matches(/[A-Z]/, 'La clave debe tener al menos una mayuscula')
    // .matches(/[0-9]/, 'La clave debe tener al menos un numero')
    // .matches(/[@$!%*?&]/, 'La clave debe tener al menos un caracter especial')
    .required('La clave es requerida'),
});

export const Login: React.FC = () => {

  const { handleSubmit, isLoading } = useHandleLoginSubmit();

  return (
    <div
      className="sign-in__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >

      <div className="sign-in__backdrop"></div>

      <Formik
        initialValues={{ userName: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="shadow p-4 bg-white rounded">
            <img
              className="img-thumbnail mx-auto d-block mb-2"
              src={Logo}
              alt="logo"
            />
            <div className="h4 mb-2 text-center">Sign In</div>

            <div className="mb-3">
              <label htmlFor="userName">Username</label>
              <Field
                type="text"
                name="userName"
                className="form-control"
                placeholder="Enter your username"
              />
              <ErrorMessage name="userName" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
              />
              <ErrorMessage name="password" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <Field type="checkbox" name="rememberMe" id="rememberMe" />
              <label htmlFor="rememberMe" className="ms-2">Remember me</label>
              {/* En proceso... */}
            </div>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting || isLoading ? 'Logging In...' : 'Log In'}
            </Button>

            <div className="d-grid justify-content-end mt-3">
              <Button
                className="text-muted px-0"
                variant="link"
                onClick={() => {
                  // Manejo del clic para olvidar contraseña, proceso...
                }}
              >
                Forgot password?
              </Button>
            </div>
          </Form>
        )}
      </Formik>

      <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
        molinaja | &copy;2024
      </div>
    </div>
  );
};
