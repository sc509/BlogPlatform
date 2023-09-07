import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Cookies from "js-cookie";

import styles from './edit-profile.module.scss';

import { useAppDispatch, useAppSelector } from '../../redux/store.ts';
import { useEditUserMutation } from "../../redux/articleApi.tsx";
import { userActions } from "../../redux/slice/user-slice.ts";

interface EditProfileForm {
  username: string;
  email: string;
  password: string;
  avatar: string;
}

function EditProfile() {
  const userName = useAppSelector((state) => state.user.username);
  const email = useAppSelector((state) => state.user.email);
  const [editUser ] = useEditUserMutation();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileForm>();

  const onSubmit: SubmitHandler<EditProfileForm> = async (data) => {
    const response = await editUser({
      password: data.password,
      image: data.avatar,
    });
    // @ts-ignore
    dispatch(userActions.setUserImage(response.data.user.image));
    // @ts-ignore
    Cookies.set('url', response.data.user.image )
    // @ts-ignore
    if (response.data){
      toast.success('The data has been changed');
    }
  };

  const {
    editForm,
    editFormHeader,
    editFormInputGroup,
    editFormInputGroupSolo,
    editFormMiniHeader,
    editFormInputGroupInput,
    editFormInputGroupInputError,
    editFormInputGroupError,
    editFormSave,
  } = styles;
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={editForm}>
        <h1 className={editFormHeader}>Edit Profile</h1>
        <div className={editFormInputGroup}>
          <div className={editFormInputGroupSolo}>
            <h2 className={editFormMiniHeader}>Username</h2>
            <input
              {...register('username', {
                required: 'Username is required',
              })}
              type="text"
              className={`${editFormInputGroupInput} ${errors.username ? editFormInputGroupInputError : ''}`}
              placeholder="Username"
              defaultValue={userName}
            />
            {errors.username && <p className={editFormInputGroupError}>{errors.username.message}</p>}
          </div>
          <div className={editFormInputGroupSolo}>
            <h2 className={editFormMiniHeader}>Email address</h2>
            <input
              {...register('email', {
                required: 'Email Address is required',
                pattern: {
                  value: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
                  message: 'Invalid email address',
                },
              })}
              type="email"
              className={`${editFormInputGroupInput} ${errors.email ? editFormInputGroupInputError : ''}`}
              placeholder="Email address"
              defaultValue={email}
            />
            {errors.email && <p className={editFormInputGroupError}>{errors.email.message}</p>}
          </div>
          <div className={editFormInputGroupSolo}>
            <h2 className={editFormMiniHeader}>New password</h2>
            <input
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
              className={`${editFormInputGroupInput} ${errors.password ? editFormInputGroupInputError : ''}`}
              placeholder="New password"
            />
            {errors.password && <p className={editFormInputGroupError}>{errors.password.message}</p>}
          </div>
          <div className={editFormInputGroupSolo}>
              <h2 className={editFormMiniHeader}>Avatar image (url)</h2>
              <input
            {...register('avatar', {
              pattern: {
              value: /^(ftp|http|https):\/\/[^ "]+$/,
              message: ' Invalid url',
            },
            })}
            type="url"
            className={`${editFormInputGroupInput} ${errors.avatar ? editFormInputGroupInputError : ''}`}
            placeholder="Avatar image"
          />
          {errors.avatar && <p className={editFormInputGroupError}>{errors.avatar.message}</p>}
          </div>
        </div>
        <button type="submit" className={editFormSave}>
          Save
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
