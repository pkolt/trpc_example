import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '@wisdom/backend/src/auth/schemas.js';
import { PageUrl } from '@/constants.js';
import { type RouterInput, trpc } from '@/trpc.js';
import { useAuthStore } from '@/store/auth.js';
import { useEffect } from 'react';
import { Input } from '@/components/Input/index.js';

type FormData = RouterInput['auth']['login'];

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuthStore();
  const { mutateAsync: login, isLoading, error } = trpc.auth.login.useMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const result = await login(data);
      auth.setData(result);
    } catch {
      // empty
    }
  };

  useEffect(() => {
    if (auth.data) {
      navigate(PageUrl.Dashboard);
    }
  }, [auth.data, navigate]);

  return (
    <div className="d-flex align-items-center d-flex h-100 justify-content-center">
      <form className="col-lg-3" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-center">Авторизация</h1>
        {error && <div className="alert alert-danger">{error.message}</div>}
        <div className="d-flex flex-column gap-3">
          <Input name="login" label="Логин" autoComplete="username" register={register} errors={errors} />
          <Input
            name="password"
            type="password"
            label="Пароль"
            autoComplete="current-password"
            register={register}
            errors={errors}
          />

          <div className="d-flex justify-content-center gap-4">
            <button type="submit" className="btn btn-outline-primary w-25" disabled={isLoading}>
              Вход
            </button>
            <Link to={PageUrl.Registration} className="btn btn-outline-secondary">
              Регистрация
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
