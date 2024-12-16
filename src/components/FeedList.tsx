import React from 'react';
import { RssIcon } from 'lucide-react';

interface FeedListProps {
  feeds: string[];
  activeFeed: string | null;
  onSelectFeed: (url: string) => void;
  onAddFeed: () => void;
}

export function FeedList({ feeds, activeFeed, onSelectFeed, onAddFeed }: FeedListProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Feeds</h2>
        <button
          onClick={onAddFeed}
          className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
          title="Add new feed"
        >
          <RssIcon size={20} />
        </button>
      </div>
      <div className="space-y-2">
        {feeds.map((feed) => (
          <button
            key={feed}
            onClick={() => onSelectFeed(feed)}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
              activeFeed === feed
                ? 'bg-blue-100 text-blue-800'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            {feed}
          </button>
        ))}
      </div>
    </div>
  );
}