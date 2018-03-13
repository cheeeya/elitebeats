export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
import * as CommentAPIUtil from '../util/comment_api_util';

const receiveComment = comment => ({
  type: RECEIVE_COMMENT,
  comment
});

export const postComment = (comment, songId) => dispatch => (
  CommentAPIUtil.postComment(comment, songId).then(
    comment => dispatch(receiveComment(comment))
  )
);
