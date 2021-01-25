import createDataContext from './createDataContext';
import R from 'ramda';

const notEquals = R.complement(R.equals);

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_BLOG_POST':
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 999999),
          title: action.payload.title,
          content: action.payload.content,
        },
      ];
    case 'DELETE_BLOG_POST':
      const notId = R.compose(notEquals(action.payload), R.prop('id'));
      return state.filter(notId);
    default:
      return state;
  }
};

const addBlogPost = dispatch => (title, content, callback) => {
  dispatch({ type: 'ADD_BLOG_POST', payload: { title, content } });
  if (callback) callback();
};

const deleteBlogPost = dispatch => id => {
  dispatch({ type: 'DELETE_BLOG_POST', payload: id });
};
export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost },
  []
);
