import { MdReply } from "react-icons/md";
import ReplyCommentForm from "./ReplyCommentForm";
import { FaRegHeart } from "react-icons/fa";
import noAvatar from "../../../assets/img/users/noavatar.png";
import moment from "jalali-moment";
import { useLayoutEffect, useState } from "react";
import SingleCommentsList from "./SingleCommentsList";
import { infoToast } from "../../../services/toastMessages";
import { useSelector } from "react-redux";

export default function CommentItem({ comment, article_id }) {
    const [activeReplyForm, setActiveReplyForm] = useState("");
    const [activeAnswers, setActiveAnswers] = useState(0);
    const childs = useSelector((state) =>
        state.singleArticle.comments.data.filter(
            (cm) => cm.comment_id === comment.id
        )
    );

    const handleReplyComment = () => {
        if (!sessionStorage.getItem("user")) {
            infoToast("برای ثبت نظر وارد حساب کاربری خود شوید.");
            return;
        }
        setActiveReplyForm(comment.id);
    };

    const handleShowAnswers = () => setActiveAnswers(comment.id);

    useLayoutEffect(() => {});

    return (
        <>
            <div className="comment-item">
                <div className="comment-user-info">
                    <div className="user-avatar">
                        <img src={noAvatar} alt={noAvatar} />
                    </div>
                    <strong>{comment.author}</strong>
                    <span>
                        {moment(comment.create_time).locale("fa").fromNow()}
                    </span>
                </div>
                <div className="comment-body">
                    <p>{comment.body}</p>
                    <div className="comment-actions">
                        <div className="comment-actions-btn">
                            <div className="comment-like-action">
                                <FaRegHeart />
                            </div>
                            <div
                                className="comment-reply-action"
                                onClick={handleReplyComment}
                            >
                                <MdReply />
                            </div>
                            {childs.length > 0 &&
                                (activeAnswers === comment.id ? (
                                    <button onClick={() => setActiveAnswers(0)}>
                                        پنهان کردن
                                    </button>
                                ) : (
                                    <button onClick={handleShowAnswers}>
                                        نمایش {childs.length} پاسخ
                                    </button>
                                ))}
                        </div>
                    </div>
                </div>
                {activeReplyForm === comment.id && (
                    <ReplyCommentForm
                        comment_id={comment.id}
                        setActiveReplyForm={setActiveReplyForm}
                        article_id={article_id}
                    />
                )}
            </div>
            {activeAnswers === comment.id && (
                <div className="child-comments">
                    <SingleCommentsList
                        comments={childs}
                        article_id={article_id}
                    />
                </div>
            )}
        </>
    );
}
