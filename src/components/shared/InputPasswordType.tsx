import { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { InputPasswordProps } from '@/types';

const InputPasswordType = ({
  errors,
  register,
  name,
  placeholder,
}: InputPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);
  if (!register || !name) return;

  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type={showPassword ? 'text' : 'password'}
            {...register(name)}
            // value={formData.password}
            className={`w-full pl-10 pr-12 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
              errors
                ? 'border-red-400 focus:ring-red-500'
                : 'border-white/20 focus:ring-blue-500 focus:border-transparent'
            }`}
            placeholder={placeholder}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default InputPasswordType;
