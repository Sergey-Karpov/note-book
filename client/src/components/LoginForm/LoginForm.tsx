import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { FormField } from '../FormField';
import './LoginForm.css';
import { Button } from '../Button';
import { User, UserSchema } from '../../schemas/UserSchema';
import { queryClient } from '../../api/queryClient';
import { loginUser } from '../../api/User';
import { FC } from 'react';

export const LoginForm: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(UserSchema),
  });

  const loginMutation = useMutation(
    {
      mutationFn: (user: User) => loginUser(user.email, user.password),
      onSuccess: () => {
        reset();
        queryClient.invalidateQueries({ queryKey: ['users', 'me'] });
      },
      onError: (error: any) => {
        console.error('Login failed:', error);
      },
    },
    queryClient
  );

  const onSubmit = (data: User) => {
    loginMutation.mutate(data);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Email" errorMessage={errors.email?.message}>
        <input {...register('email')} />
      </FormField>
      <FormField label="Пароль" errorMessage={errors.password?.message}>
        <input type="password" {...register('password')} />
      </FormField>
      {loginMutation.error && <span>{loginMutation.error.message}</span>}
      <Button type={'submit'} isLoading={loginMutation.isPending}>
        Войти
      </Button>
    </form>
  );
};
