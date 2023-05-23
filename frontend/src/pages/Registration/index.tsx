import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegistrationSchema } from '@wisdom/backend/src/user/schemas.js';
import { PageUrl } from '@/constants.js';
import { type RouterInput, trpc } from '@/trpc.js';
import { Input } from '@/components/Input/index.js';

type FormData = RouterInput['user']['registration'];

const Registration = () => {
  const navigate = useNavigate();
  const { mutateAsync: registration, isLoading, error, isSuccess } = trpc.user.registration.useMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(RegistrationSchema),
  });
  const onSubmit = async (data: FormData) => {
    try {
      const result = await registration(data);
      if (result) {
        navigate(PageUrl.Login);
      }
    } catch {
      // ...
    }
  };

  return (
    <div className="d-flex align-items-center d-flex h-100 justify-content-center">
      <form className="col-lg-4" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-center">Регистрация</h1>
        {isSuccess ? (
          <div className="alert alert-success" role="alert">
            Пользователь создан!
            <br />
            <Link to={PageUrl.Login}>Войдите</Link> используя свой логин и пароль.
          </div>
        ) : (
          <>
            {error && <div className="alert alert-danger">{error.message}</div>}
            <div className="d-flex flex-column gap-3">
              <Input name="login" label="Логин" autoComplete="off" register={register} errors={errors} />
              <Input name="password" label="Пароль" type="password" register={register} errors={errors} />
              <Input name="email" label="Email" type="email" autoComplete="email" register={register} errors={errors} />
              <Input name="username" label="Имя пользователя" register={register} errors={errors} />

              <div className="d-flex justify-content-center gap-4">
                <button type="submit" className="btn btn-outline-primary" disabled={isLoading}>
                  Зарегистрироваться
                </button>
                <Link to={PageUrl.Root} className="btn btn-outline-secondary">
                  Отмена
                </Link>
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Registration;
