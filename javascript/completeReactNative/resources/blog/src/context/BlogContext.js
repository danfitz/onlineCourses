import createDataContext from './createDataContext';
import R from 'ramda';
import jsonServer from '../api/jsonServer';

const notEquals = R.complement(R.equals);

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'GET_BLOG_POSTS':
      return action.payload;
    case 'DELETE_BLOG_POST':
      const notId = R.compose(notEquals(action.payload), R.prop('id'));
      return state.filter(notId);
    case 'EDIT_BLOG_POST':
      const updateTargetPost = R.ifElse(
        R.propEq('id', action.payload.id),
        R.always(action.payload),
        R.identity
      );
      return state.map(updateTargetPost);
    default:
      return state;
  }
};

const getBlogPosts = dispatch =>
  R.curry(async () => {
    try {
      const { data } = await jsonServer.get('/blogposts');
      dispatch({ type: 'GET_BLOG_POSTS', payload: data });
    } catch (error) {
      console.log(error);
    }
  });

const addBlogPost = dispatch =>
  R.curry(async (title, content, callback) => {
    try {
      await jsonServer.post('/blogposts', { title, content });
      if (callback) callback();
    } catch (error) {
      console.log(error);
    }
  });

const deleteBlogPost = dispatch =>
  R.curry(async id => {
    try {
      await jsonServer.delete(`/blogposts/${id}`);
      dispatch({ type: 'DELETE_BLOG_POST', payload: id });
    } catch (error) {
      console.log(error);
    }
  });

const editBlogPost = dispatch =>
  R.curry(async (id, title, content, callback) => {
    try {
      await jsonServer.put(`/blogposts/${id}`, { title, content });
      dispatch({ type: 'EDIT_BLOG_POST', payload: { id, title, content } });
      if (callback) callback();
    } catch (error) {
      console.log(error);
    }
  });

export const { Context, Provider } = createDataContext(
  blogReducer,
  { getBlogPosts, addBlogPost, deleteBlogPost, editBlogPost },
  [{ id: 1, title: 'Test Post', content: 'Test Content' }]
);
