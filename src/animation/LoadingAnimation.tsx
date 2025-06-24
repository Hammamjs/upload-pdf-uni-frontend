interface LoadingAnimationProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'purple' | 'white' | 'green';
  text?: string;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({
  size = 'md',
  color = 'blue',
  text = 'Loading...',
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  const colorClasses = {
    blue: 'border-blue-500',
    purple: 'border-purple-500',
    white: 'border-white',
    green: 'border-green-500',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Spinning Circle */}
      <div className="relative">
        <div
          className={`${sizeClasses[size]} border-4 border-gray-300 rounded-full animate-spin`}
        >
          <div
            className={`absolute inset-0 ${sizeClasses[size]} border-4 ${colorClasses[color]} border-t-transparent rounded-full animate-spin`}
          />
        </div>
      </div>

      {/* Loading Text */}
      {text && (
        <p className={`${textSizeClasses[size]} text-gray-300 animate-pulse`}>
          {text}
        </p>
      )}

      {/* Animated Dots */}
      <div className="flex space-x-1">
        <div
          className={`w-2 h-2 ${colorClasses[color].replace(
            'border-',
            'bg-'
          )} rounded-full animate-bounce`}
          style={{ animationDelay: '0ms' }}
        />
        <div
          className={`w-2 h-2 ${colorClasses[color].replace(
            'border-',
            'bg-'
          )} rounded-full animate-bounce`}
          style={{ animationDelay: '150ms' }}
        />
        <div
          className={`w-2 h-2 ${colorClasses[color].replace(
            'border-',
            'bg-'
          )} rounded-full animate-bounce`}
          style={{ animationDelay: '300ms' }}
        />
      </div>
    </div>
  );
};

export default LoadingAnimation;
