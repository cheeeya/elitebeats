export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";
import * as CommentAPIUtil from '../util/comment_api_util';

const receiveComment = comment => ({
  type: RECEIVE_COMMENT,
  comment
});

const removeComment = comment => ({
  type: REMOVE_COMMENT,
  comment
});

export const postComment = (comment, songId) => dispatch => (
  CommentAPIUtil.postComment(comment, songId).then(
    comment => dispatch(receiveComment(comment))
  )
);

export const deleteComment = (commentId) => dispatch => (
  CommentAPIUtil.deleteComment(commentId).then(
    comment => dispatch(removeComment(comment))
  )
);
