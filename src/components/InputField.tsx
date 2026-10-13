import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  id: string;
}

export const InputField: React.FC<InputFieldProps> = ({ label, error, id, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={id} className="text-sm font-semibold text-slate-700">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
          error ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-blue-500'
        } ${className}`}
        {...props}
      />
      {error && (
        <span id={`${id}-error`} className="text-xs text-red-600 font-medium mt-1" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};