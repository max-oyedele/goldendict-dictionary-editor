export type TypeRouter<T = string> = {
  title: T;
  path: T;
  element: React.ReactElement;
};

export type EntryItem = {
  term: string;
  article: string;
  createdAt?: Date;
  updatedAt?: Date;
};
