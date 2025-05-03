// components/loading-spinner.tsx
export function LoadingSpinner({ size = 'default' }: { size?: 'small' | 'default' | 'large' }) {
    const sizeClass = 
      size === 'small' ? 'h-4 w-4' :
      size === 'large' ? 'h-12 w-12' :
      'h-8 w-8';
      
    return (
      <div className="flex justify-center items-center">
        <div className={`${sizeClass} animate-spin rounded-full border-b-2 border-indigo-600`} />
      </div>
    );
  }
  