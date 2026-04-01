export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="relative">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <div className="animate-pulse absolute inset-0 rounded-full bg-primary-600/20"></div>
      </div>
    </div>
  );
}
