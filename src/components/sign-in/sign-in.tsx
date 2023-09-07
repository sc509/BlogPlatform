import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useLoginUserMutation } from '../../redux/articleApi.tsx';
import { actions } from "../../redux/slice/auth-slice.ts";
import { useAppDispatch } from "../../redux/store.ts";
import ROUTES from "../../Utils/routes.ts";

import Cookies from 'js-cookie';

import styles from './sign.in.module.scss';

interface SignInForm {
  email: string;
  password: string;
}

function SignIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>();

  const [loginUser, { error }] = useLoginUserMutation();
  const onSubmit: SubmitHandler<SignInForm> = async (data) => {
    const response = await loginUser({
      email: data.email,
      password: data.password,
    });
    // @ts-ignore
    if (response.data) {
      // @ts-ignore
      Cookies.set('token', response.data.user.token);
      // @ts-ignore
      Cookies.set('username', response.data.user.username);
      // @ts-ignore
      Cookies.set('email', response.data.user.email )
      dispatch(actions.login());
      toast.success('Authorization was successful');
      navigate('/');
    } else if (error) {
      // @ts-ignore
      if (error.data && error.data.errors) {
        // @ts-ignore
        if (error.data.errors['email or password']) {
          // @ts-ignore
          toast.error(`Email or Password ${error.data.errors['email or password']}`);
        }
      } else {
        toast.error("Registration error");
      }
    }
  };

  const {
    signInFormInputGroup,
    signInFormInputGroupSolo,
    signInFormLogin,
    signInFormSignUp,
    signInFormSignUpBlue,
    signInForm,
    signInFormHeader,
    signInFormMiniHeader,
    signInFormInputGroupInput,
    signInFormInputGroupInputError,
    signInFormInputGroupError,
  } = styles;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={signInForm}>
        <h1 className={signInFormHeader}>Sign In</h1>
        <div className={signInFormInputGroup}>
          <div className={signInFormInputGroupSolo}>
            <h2 className={signInFormMiniHeader}>Email address</h2>
            <input
              type="email"
              className={`${signInFormInputGroupInput} ${errors.email ? signInFormInputGroupInputError : ''}`}
              {...register('email', {
                required: 'Email Address is required',
                pattern: {
                  value: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
                  message: 'Invalid email address',
                },
              })}
              placeholder="Email address"
            />
            {errors.email && <p className={signInFormInputGroupError}>{errors.email.message}</p>}
          </div>
          <div className={signInFormInputGroupSolo}>
            <h2 className={signInFormMiniHeader}>Password</h2>
            <input
              type="password"
              className={`${signInFormInputGroupInput} ${errors.password ? signInFormInputGroupInputError : ''}`}
              {...register('password', {
                required: 'Password is required',
              })}
              placeholder="Password"
            />
            {errors.password && <p className={signInFormInputGroupError}>{errors.password.message}</p>}
          </div>
        </div>
        <button type="submit" className={signInFormLogin}>
          Login
        </button>
        <p className={signInFormSignUp}>
          Don’t have an account?
          <Link to={ROUTES.SIGN_UP} className={signInFormSignUpBlue}>
            {' '}
            Sign Up.
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
