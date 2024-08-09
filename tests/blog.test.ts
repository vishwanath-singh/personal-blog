import request from 'supertest';
import app from '../src/index'; 
import {sequelizeConnection as sequelize}  from '../src/database'; 
import Blog  from '../src/models/blog'; 
import User from '../src/models/user'; 

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await User.create({
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
  });
  await Blog.create({
    id: 3,
    title: 'First Post',
    content: 'This is the content of the first post',
    userId: 1,
  });
});

afterAll(async () => {
  await sequelize.close();
});

describe('blog api', () => {
  it('should return a list of blogs with user details', async () => {
    const response = await request(app).get('/blog');
    expect(response.statusCode).toBe(200);
    expect(response.body['blogs'].length).toBe(1);
    expect(response.body['blogs'][0]).toHaveProperty('title', 'First Post');
    expect(response.body['blogs'][0].User).toHaveProperty('firstName', 'John');
  });

  it('should return a blog post by ID', async () => {
    const blogId = 3;

    const response = await request(app).get(`/blog/${blogId}`);

    expect(response.status).toBe(200); 
    expect(response.body['blog']).toHaveProperty('id', blogId); 
    expect(response.body['blog']).toHaveProperty('title', 'First Post'); 
    expect(response.body['blog']).toHaveProperty('content', 'This is the content of the first post'); 
    expect(response.body['blog'].User).toHaveProperty('firstName', 'John'); 
  });

  it('should return 404 if there is an error in blig fetch', async () => {
    const nonExistentBlogId = 999;

    const response = await request(app).get(`/blog/${nonExistentBlogId}`);
    expect(response.status).toBe(404); 
    expect(response.body).toHaveProperty('error', 'Blog does not exist');
  });

  it('should create a new blog post and return the created post', async () => {
    const newBlog = {
      title: 'New Blog Post',
      content: 'This is a new blog post.',
      userId: 1,
    };

    const response = await request(app)
      .post('/blog/post')
      .send(newBlog); 
   
    expect(response.status).toBe(201); 
    expect(response.body['blog']).toHaveProperty('title', newBlog.title); 
    expect(response.body['blog']).toHaveProperty('content', newBlog.content); 
    expect(response.body['blog']).toHaveProperty('userId', newBlog.userId); 
    
    const blogInDb = await Blog.findByPk(response.body['blog'].id);
    expect(blogInDb).not.toBeNull(); 
    expect(blogInDb?.title).toBe(newBlog.title);
    expect(blogInDb?.content).toBe(newBlog.content);
    expect(blogInDb?.userId).toBe(newBlog.userId);
  });

  it('should update a blog post by ID', async () => {
    const blogId = 1;
    const updatedData = {
      title: 'Updated Post Title',
      content: 'This is the updated content of the post',
    };

    const response = await request(app)
      .patch(`/blog/post/${blogId}`)
      .send(updatedData);

    expect(response.status).toBe(200); 
    expect(response.body.message).toBe('Blog updated successfully'); 

    const blogInDb = await Blog.findByPk(blogId);
    expect(blogInDb).not.toBeNull(); 
    expect(blogInDb?.title).toBe(updatedData.title);
    expect(blogInDb?.content).toBe(updatedData.content);
  });

  it('should delete a blog post by ID', async () => {
    const blogId = 1;

    const response = await request(app)
      .delete(`/blog/${blogId}`);

    expect(response.status).toBe(200); 
    expect(response.body).toHaveProperty('message', 'Blog deleted successfully'); 

    const deletedBlog = await Blog.findByPk(blogId);
    expect(deletedBlog).toBeNull(); 
  });
  
});
