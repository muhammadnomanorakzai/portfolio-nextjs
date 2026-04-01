export default function SectionSkeleton() {
  return (
    <div className="w-full py-10 animate-pulse">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading skeleton */}
        <div className="flex flex-col items-center mb-12">
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>

        {/* Content skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 h-64">
              <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 w-4/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
