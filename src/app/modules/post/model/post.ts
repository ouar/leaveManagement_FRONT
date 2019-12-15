import { PostDetail } from './post-detail';

export class Post {
  id: number;
  body: string;
  createdAt: string;
  published: string;
  slug: string;
  title: string;
  updatedAt: string;
  views: number;
  postDetails: Array<PostDetail>;
}
