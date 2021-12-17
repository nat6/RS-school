export type Author = {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: { id: string; name: string };
  title: string;
  url: string;
  urlToImage: string;
};

export type Source = {
  category: string;
  country: string;
  description: string;
  id: string;
  language: string;
  name: string;
  url: string;
};

export type Data = {
  articles?: Author[];
  sources?: Source[];
};

export type Callback<T> = (data: T) => void;

export type Options = {
  sources?: string | null;
  status?: string | null;
};
