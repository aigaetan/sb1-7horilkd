import React from 'react';
import { format } from 'date-fns';
import { FeedItem } from '../types/feed';

interface ArticleListProps {
  articles: FeedItem[];
  onSelectArticle: (article: FeedItem) => void;
  selectedArticle: FeedItem | null;
}

export function ArticleList({ articles, onSelectArticle, selectedArticle }: ArticleListProps) {
  return (
    <div className="w-96 border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Articles</h2>
        <div className="space-y-4">
          {articles.map((article) => (
            <button
              key={article.link}
              onClick={() => onSelectArticle(article)}
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                selectedArticle?.link === article.link
                  ? 'bg-blue-100'
                  : 'hover:bg-gray-100'
              }`}
            >
              <h3 className="font-semibold text-gray-800 mb-2">{article.title}</h3>
              <div className="flex items-center text-sm text-gray-500">
                {article.creator && (
                  <span className="mr-3">{article.creator}</span>
                )}
                <time>
                  {format(new Date(article.pubDate), 'MMM d, yyyy')}
                </time>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}