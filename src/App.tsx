import React, { useState, useEffect } from 'react';
import Parser from 'rss-parser';
import { PlusIcon, Loader2Icon } from 'lucide-react';
import { FeedList } from './components/FeedList';
import { ArticleList } from './components/ArticleList';
import { ArticleView } from './components/ArticleView';
import type { Feed, FeedItem } from './types/feed';

const parser = new Parser();

const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

function App() {
  const [feeds, setFeeds] = useState<string[]>([
    'https://news.ycombinator.com/rss',
    'https://reactjs.org/feed.xml'
  ]);
  const [activeFeed, setActiveFeed] = useState<string | null>(null);
  const [feedData, setFeedData] = useState<Feed | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<FeedItem | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeFeed) {
      fetchFeed(activeFeed);
    }
  }, [activeFeed]);

  const fetchFeed = async (url: string) => {
    setLoading(true);
    try {
      const feed = await parser.parseURL(CORS_PROXY + encodeURIComponent(url));
      setFeedData({
        title: feed.title || '',
        description: feed.description || '',
        items: feed.items.map(item => ({
          title: item.title || '',
          link: item.link || '',
          content: item.content || item['content:encoded'] || '',
          pubDate: item.pubDate || '',
          creator: item.creator || item['dc:creator'],
          categories: item.categories
        }))
      });
    } catch (error) {
      console.error('Error fetching feed:', error);
    }
    setLoading(false);
  };

  const handleAddFeed = () => {
    const url = prompt('Enter RSS feed URL:');
    if (url && !feeds.includes(url)) {
      setFeeds([...feeds, url]);
      setActiveFeed(url);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-screen flex">
        <FeedList
          feeds={feeds}
          activeFeed={activeFeed}
          onSelectFeed={setActiveFeed}
          onAddFeed={handleAddFeed}
        />
        
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2Icon className="animate-spin text-blue-600" size={32} />
          </div>
        ) : (
          <>
            <ArticleList
              articles={feedData?.items || []}
              onSelectArticle={setSelectedArticle}
              selectedArticle={selectedArticle}
            />
            <ArticleView article={selectedArticle} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;