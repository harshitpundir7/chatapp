import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

export const InputField = ({
    icon: Icon,
    type,
    placeholder,
    value,
    onChange,
    showPassword,
    togglePasswordVisibility,
    name
}) => (
    <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
            <Icon className="text-zinc-400 w-6 h-6" />
        </div>
        <input
            type={showPassword ? 'text' : type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
            className="w-full pl-12 pr-12 py-4 text-lg bg-zinc-900 border border-zinc-800 rounded-lg text-white 
                focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300"
        />
        {type === 'password' && (
            <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
            >
                {showPassword ? (
                    <EyeOff className="text-zinc-400 w-6 h-6" />
                ) : (
                    <Eye className="text-zinc-400 w-6 h-6" />
                )}
            </button>
        )}
    </div>
);
