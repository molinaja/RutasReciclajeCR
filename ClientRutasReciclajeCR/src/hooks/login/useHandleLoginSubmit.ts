import { useLogin } from "./useLogin";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice/authSlice";
import { FormikHelpers } from "formik";

interface LoginValues {
  userName: string;
  password: string;
}

export function useHandleLoginSubmit() {
  const dispatch = useDispatch();
  const loginMutation = useLogin(); // Hook que maneja la lógica del login

  const handleSubmit = (
    values: LoginValues,
    { setSubmitting, setFieldError }: FormikHelpers<LoginValues>
  ) => {
    loginMutation.mutate(values, {
      onSuccess: (data) => {
        if (data.success) {
          dispatch(login({ token: data.token, userName: data.name }));
        } else {
          setFieldError("password", "Incorrect username or password.");
        }
        setSubmitting(false);
      },
      onError: () => {
        setFieldError("password", "An error occurred. Please try again.");
        setSubmitting(false);
      },
    });
  };

  return { handleSubmit, isLoading: loginMutation.status === "pending" };
}
