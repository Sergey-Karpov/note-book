import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../api/queryClient';
import { FormField } from '../FormField';
import { User, UserSchema } from '../../schemas/UserSchema';
import { Button } from '../Button';
import './RegisterForm.css';
import { loginUser, registerUser } from '../../api/User';
import { FC } from 'react';

export const RegisterForm: FC = () => {
  const registrationUserSchema = UserSchema;

  type RegUserData = z.infer<typeof registrationUserSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegUserData>({
    resolver: zodResolver(registrationUserSchema),
  });

  const registerMutation = useMutation(
    {
      mutationFn: async (user: User) => {
        await registerUser(user);
        await loginUser(user.email, user.password);
        queryClient.invalidateQueries({ queryKey: ['users', 'me'] });
      },

      onSuccess: () => {
        reset();
        console.log('success registration');
      },
    },
    queryClient
  );

  const unSubmit = (data: RegUserData) => {
    registerMutation.mutate(data);
  };

  return (
    <form className="register-form" onSubmit={handleSubmit(unSubmit)}>
      <FormField label="Name" errorMessage={errors.username?.message}>
        <input
          {...register('username')}
          disabled={registerMutation.isPending}
        />
      </FormField>
      <FormField label="Email" errorMessage={errors.email?.message}>
        <input {...register('email')} disabled={registerMutation.isPending} />
      </FormField>
      <FormField label="Пароль" errorMessage={errors.password?.message}>
        <input
          type="password"
          {...register('password')}
          disabled={registerMutation.isPending}
        />
      </FormField>
      {registerMutation.error && <span>{registerMutation.error.message}</span>}
      <Button type="submit" isLoading={registerMutation.isPending}>
        Зарегистрироваться
      </Button>
    </form>
  );
};
