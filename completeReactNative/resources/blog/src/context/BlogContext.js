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

const addBlogPost = dispatch =>
  R.curry((title, content, callback) => {
    dispatch({ type: 'ADD_BLOG_POST', payload: { title, content } });
    if (callback) callback();
  });

const deleteBlogPost = dispatch =>
  R.curry(id => {
    dispatch({ type: 'DELETE_BLOG_POST', payload: id });
  });

const editBlogPost = dispatch =>
  R.curry((id, title, content, callback) => {
    dispatch({ type: 'EDIT_BLOG_POST', payload: { id, title, content } });
    if (callback) callback();
  });

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost },
  [{ id: 1, title: 'Test Post', content: 'Test Content' }]
);
