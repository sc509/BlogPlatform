import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './sign-up.module.scss';
import {useCreateUserMutation} from "../../redux/articleApi.tsx";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";

interface SignUpForm {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  userAgreement: boolean;
}

function SignUp() {
  const [createUser, { isLoading, isError, error }] = useCreateUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignUpForm>();

  const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
    const response = await createUser({
      username: data.username,
      email: data.email,
      password: data.password,
    });

    if (response.data) {
      toast.success("You have successfully registered!");
    } else if (error) {
      if (error.data && error.data.errors) {
        if (error.data.errors.email) {
          toast.error(`Email ${error.data.errors.email}`);
        }
        if (error.data.errors.username) {
          toast.error(`Username ${error.data.errors.username}`);
        }
      } else {
        toast.error("Registration error");
      }
    }
  };


  const validatePasswordMatch = (value: string) => {
    const password = getValues('password');
    return value === password || 'Passwords must match';
  };

  const {
    signUpForm,
    signUpFormHeader,
    signUpFormInputGroup,
    signUpFormMiniHeader,
    signUpFormInputGroupInput,
    signUpFormInputGroupError,
    signUpFormInputGroupSolo,
    signUpFormInputGroupInputError,
    signUpFormUserAgreement,
    signUpFormCheckbox,
    signUpFormUserAgreementError,
    signUpFormUserAgreementText,
    signUpFormCreate,
    signUpFormSignIn,
    signUpFormSignInBlue,
  } = styles;
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={signUpForm}>
        <h1 className={signUpFormHeader}>Create new account</h1>
        <div className={signUpFormInputGroup}>
          <div className={signUpFormInputGroupSolo}>
            <h2 className={signUpFormMiniHeader}>Username</h2>
            <input
              className={`${signUpFormInputGroupInput} ${errors.username ? signUpFormInputGroupInputError : ''}`}
              placeholder="Username"
              {...register('username', {
                required: 'Username is required',
                minLength: {
                  value: 3,
                  message: 'Username should be between 3 and 20 characters',
                },
                maxLength: {
                  value: 20,
                  message: 'Username should be between 3 and 20 characters',
                },
                pattern: {
                  value: /^[a-z][a-z0-9]*$/,
                  message: 'You can only use lowercase English letters and numbers',
                },
              })}
              type="text"
            />
            {errors.username && <p className={signUpFormInputGroupError}>{errors.username.message}</p>}
          </div>
          <div className={signUpFormInputGroupSolo}>
            <h2 className={signUpFormMiniHeader}>Email address</h2>
            <input
              className={`${signUpFormInputGroupInput} ${errors.email ? signUpFormInputGroupInputError : ''}`}
              {...register('email', {
                required: 'Email Address is required',
                pattern: {
                  value: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
                  message: 'Invalid email address',
                },
              })}
              type="text"
              placeholder="Email address"
            />
            {errors.email && <p className={signUpFormInputGroupError}>{errors.email.message}</p>}
          </div>
          <div className={signUpFormInputGroupSolo}>
            <h2 className={signUpFormMiniHeader}>Password</h2>
            <input
              className={`${signUpFormInputGroupInput} ${errors.password ? signUpFormInputGroupInputError : ''}`}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password should be between 6 and 40 characters',
                },
                maxLength: {
                  value: 40,
                  message: 'Password should be between 6 and 40 characters',
                },
              })}
              type="password"
              placeholder="Password"
            />
            {errors.password && <p className={signUpFormInputGroupError}>{errors.password.message}</p>}
          </div>
          <div className={signUpFormInputGroupSolo}>
            <h2 className={signUpFormMiniHeader}>Repeat Password</h2>
            <input
              className={`${signUpFormInputGroupInput} ${errors.repeatPassword ? signUpFormInputGroupInputError : ''}`}
              {...register('repeatPassword', {
                required: 'Repeat Password is required',
                validate: validatePasswordMatch,
              })}
              type="password"
              placeholder="Password"
            />
            {errors.repeatPassword && <p className={signUpFormInputGroupError}>{errors.repeatPassword.message}</p>}
          </div>
        </div>
        <div className={signUpFormUserAgreement}>
          <input
            type="checkbox"
            id="userAgreementCheckbox"
            className={signUpFormCheckbox}
            {...register('userAgreement', {
              required: 'You must agree to the data processing',
            })}
          />
          {errors.userAgreement && <p className={signUpFormUserAgreementError}>{errors.userAgreement.message}</p>}
          <p className={signUpFormUserAgreementText}>I agree to the processing of my personal information</p>
        </div>
        <button type="submit" className={signUpFormCreate}>
          Create
        </button>
        <p className={signUpFormSignIn}>
          Already have an account? <Link to="/sign-in" className={signUpFormSignInBlue}>Sign In.</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
