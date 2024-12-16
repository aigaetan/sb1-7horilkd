import React from 'react';
import { format } from 'date-fns';
import { ExternalLinkIcon } from 'lucide-react';
import { FeedItem } from '../types/feed';

interface ArticleViewProps {
  article: FeedItem | null;
}

export function ArticleView({ article }: ArticleViewProps) {
  if (!article) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Select an article to read
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>
          <div className="flex items-center justify-between text-gray-600">
            <div className="flex items-center space-x-4">
              {article.creator && (
                <span className="font-medium">{article.creator}</span>
              )}
              <time>{format(new Date(article.pubDate), 'MMMM d, yyyy')}</time>
            </div>
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <span className="mr-1">Visit Source</span>
              <ExternalLinkIcon size={16} />
            </a>
          </div>
        </header>
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>
    </div>
  );
}