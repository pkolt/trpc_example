import type { UseFormRegister, FieldErrors, FieldValues, Path } from 'react-hook-form';
import cn from 'classnames';

type InputAutoComplete = 'off' | 'email' | 'current-password' | 'username';

interface InputProps<T extends FieldValues> {
  className?: string;
  label: string;
  name: Path<T>;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  autoComplete?: InputAutoComplete;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

export const Input = <T extends FieldValues>({
  className,
  label,
  name,
  type = 'text',
  autoComplete,
  register,
  errors,
}: InputProps<T>): React.ReactElement => {
  const id = `id_${name}`;
  const errMessage = errors?.[name]?.message as string;
  return (
    <div className={className}>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        type={type}
        autoComplete={autoComplete}
        className={cn('form-control', { 'is-invalid': errMessage })}
        id={id}
        {...register(name, { required: true })}
      />
      {errMessage && <div className="invalid-feedback">{errMessage}</div>}
    </div>
  );
};
