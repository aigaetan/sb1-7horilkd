export interface FeedItem {
  title: string;
  link: string;
  content: string;
  pubDate: string;
  creator?: string;
  categories?: string[];
}

export interface Feed {
  title: string;
  description: string;
  items: FeedItem[];
}