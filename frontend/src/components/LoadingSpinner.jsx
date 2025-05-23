export default function LoadingSpinner({ size = 'medium' }) {
  const sizeClasses = {
    small: 'w-5 h-5',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className={`inline-block ${sizeClasses[size]} animate-spin rounded-full border-2 border-solid border-current border-r-transparent`}>
      <span className="sr-only">Loading...</span>
    </div>
  );
}