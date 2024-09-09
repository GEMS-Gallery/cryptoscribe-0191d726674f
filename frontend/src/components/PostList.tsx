import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

type Post = {
  id: bigint;
  title: string;
  body: string;
  author: string;
  timestamp: bigint;
};

type PostListProps = {
  posts: Post[];
};

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <Card key={post.id.toString()} className="post-card">
          <CardContent>
            <Typography variant="h5" component="h2" className="post-title">
              {post.title}
            </Typography>
            <Typography className="post-author" color="textSecondary" gutterBottom>
              By {post.author} | {new Date(Number(post.timestamp) / 1000000).toLocaleString()}
            </Typography>
            <Typography className="post-excerpt" variant="body2" component="p">
              {post.body.length > 150 ? `${post.body.substring(0, 150)}...` : post.body}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PostList;