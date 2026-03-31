import { Users } from 'lucide-react';

interface UserStackCardProps {
  title: string;
  description: string;
  userCount: number;
  category?: string;
}

/**
 * User Stack Card - Shows user avatars and course info
 * Style: Social proof element
 */
export function UserStackCard({ 
  title, 
  description, 
  userCount,
  category,
}: UserStackCardProps) {
  return (
    <div className="flex flex-col h-full">
      {/* User Avatar Stack */}
      <div className="flex items-center gap-2 mb-6">
        <div className="flex -space-x-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white flex items-center justify-center"
            >
              <Users className="w-5 h-5 text-white" />
            </div>
          ))}
        </div>
        <span className="text-sm font-medium text-gray-500">
          +{userCount}
        </span>
      </div>

      <h3 className="text-2xl sm:text-3xl font-light text-gray-900 mb-3">
        {title}
      </h3>

      <p className="text-gray-600 text-base font-light leading-relaxed mb-6">
        {description}
      </p>

      {category && (
        <div className="mt-auto">
          <div className="inline-flex items-center gap-2 text-sm text-gray-500">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>{category}</span>
          </div>
        </div>
      )}
    </div>
  );
}
