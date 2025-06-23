import React from 'react';

interface DownloadCardSkeletonProps {
  count?: number;
}

const DownloadCardSkeleton: React.FC<DownloadCardSkeletonProps> = ({
  count = 6,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white/10 w-80 backdrop-blur-md rounded-2xl p-6 border border-white/20 animate-pulse"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Header with Icon and Action Buttons */}
          <div className="flex items-start justify-between mb-4">
            {/* File Icon Skeleton */}
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400/30 to-blue-500/30 rounded-lg animate-pulse" />

            {/* Action Buttons Skeleton */}
            <div className="flex space-x-2">
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg animate-pulse" />
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg animate-pulse" />
            </div>
          </div>

          {/* Title Skeleton */}
          <div className="mb-2">
            <div className="h-5 bg-gradient-to-r from-white/20 to-white/10 rounded animate-pulse mb-2" />
            <div className="h-5 bg-gradient-to-r from-white/15 to-white/5 rounded animate-pulse w-3/4" />
          </div>

          {/* Filename Skeleton */}
          <div className="mb-4">
            <div className="h-4 bg-gradient-to-r from-gray-400/20 to-gray-400/10 rounded animate-pulse w-2/3" />
          </div>

          {/* Details Section */}
          <div className="space-y-2 mb-4">
            {/* Year */}
            <div className="flex items-center justify-between">
              <div className="h-3 bg-gray-400/20 rounded animate-pulse w-8" />
              <div className="h-3 bg-white/20 rounded animate-pulse w-12" />
            </div>

            {/* Semester */}
            <div className="flex items-center justify-between">
              <div className="h-3 bg-gray-400/20 rounded animate-pulse w-16" />
              <div className="h-3 bg-white/20 rounded animate-pulse w-14" />
            </div>

            {/* Size */}
            <div className="flex items-center justify-between">
              <div className="h-3 bg-gray-400/20 rounded animate-pulse w-6" />
              <div className="h-3 bg-white/20 rounded animate-pulse w-16" />
            </div>
          </div>

          {/* Footer Section */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="h-3 bg-gray-400/20 rounded animate-pulse w-24" />
            <div className="h-3 bg-gray-400/20 rounded animate-pulse w-20" />
          </div>

          {/* Shimmer Effect Overlay */}
          <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
        </div>
      ))}
    </div>
  );
};

export default DownloadCardSkeleton;
