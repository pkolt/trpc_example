import { type RouterInput, trpc } from '@/trpc.js';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangePasswordSchema } from '@wisdom/backend/src/user/schemas.js';
import { Input } from '@/components/Input/index.js';

type FormData = RouterInput['user']['changePassword'];

export const ChangePassword: React.FC = () => {
  const { mutateAsync: changePassword, error, isLoading, isSuccess } = trpc.user.changePassword.useMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const result = await changePassword(data);
      if (result) {
        reset();
      }
    } catch {
      // ...
    }
  };

  return (
    <div className="card">
      <h5 className="card-header">
        <i className="bi bi-lock-fill h4 me-2" />
        Смена пароля
      </h5>
      {error && <div className="card-body text-bg-danger">{error.message}</div>}
      {isSuccess && <div className="card-body text-bg-success">Пароль изменен!</div>}

      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-3">
          <Input
            name="oldPassword"
            label="Старый пароль"
            type="password"
            autoComplete="off"
            register={register}
            errors={errors}
          />
          <Input
            name="newPassword"
            label="Новый пароль"
            type="password"
            autoComplete="off"
            register={register}
            errors={errors}
          />
          <Input
            name="confirmNewPassword"
            label="Повторить новый пароль"
            type="password"
            autoComplete="off"
            register={register}
            errors={errors}
          />
          <button type="submit" className="btn btn-outline-primary align-self-start" disabled={isLoading}>
            Изменить пароль
          </button>
        </form>
      </div>
    </div>
  );
};
