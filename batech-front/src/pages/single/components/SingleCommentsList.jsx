import React from "react";
import CommentItem from "./CommentItem";

export default function SingleCommentsList({ comments, article_id }) {
    return (
        <div className="single-comments-list">
            {comments.map((comment) => {
                return (
                    <CommentItem
                        key={comment.id}
                        comment={comment}
                        article_id={article_id}
                        endComments={comments}
                    />
                );
            })}
        </div>
    );
}
