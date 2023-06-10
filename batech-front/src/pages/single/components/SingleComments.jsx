import { ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import { useState } from "react";
import commentLogo from "../../../assets/img/comments.png";
import { addCommentValidation } from "../../../services/formValidationSchema";
import { infoToast, successToast } from "../../../services/toastMessages";
import Request from "../../../services/request";
import SingleCommentsList from "./SingleCommentsList";
import { useDispatch } from "react-redux";
import { addComment } from "../../../redux/reducers/singleArticleReducer";
import { nanoid } from "@reduxjs/toolkit";

export default function SingleComments({ comments, article }) {
    const [addCommentForm, setAddCommentForm] = useState(false);
    const dispatch = useDispatch();

    const { handleSubmit, values, errors, setValues, resetForm } = useFormik({
        initialValues: {
            id: nanoid(),
            comment: "",
            user_id: "",
            name: "",
            article_id: article.data.id,
            comment_id: null,
            type: "main",
        },
        onSubmit: async () => {
            dispatch(addComment(values));
            const result = await new Request().post("comment/", values);
            if (result.status === 201) {
                successToast(result.message);
            }
            resetForm();
        },
        validationSchema: addCommentValidation,
    });

    const handleAddComment = () => {
        if (!sessionStorage.getItem("user")) {
            infoToast("برای ثبت نظر وارد حساب کاربری خود شوید.");
            return;
        }
        setAddCommentForm(true);
    };

    return (
        <>
            <div className="single-comments">
                <h3 className="site-title">نظرات</h3>
                <div className="comments-header">
                    <div className="comment-logo">
                        <img src={commentLogo} alt={commentLogo} />
                    </div>
                    <span>30 دیدگاه ثبت شده، نظر تو چیه؟</span>
                    {!addCommentForm && (
                        <button type="submit" onClick={handleAddComment}>
                            ثبت دیدگاه
                        </button>
                    )}
                    {addCommentForm && (
                        <div className="comment-form add-comment">
                            <form onSubmit={handleSubmit}>
                                <textarea
                                    name="comment"
                                    id="comment"
                                    cols="0"
                                    rows="3"
                                    placeholder="نظر خود را بنویسید ..."
                                    onChange={(e) =>
                                        setValues({
                                            ...values,
                                            user_id: JSON.parse(
                                                sessionStorage.getItem("user")
                                            )["id"],
                                            name: JSON.parse(
                                                sessionStorage.getItem("user")
                                            )["name"],
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    value={values.comment}
                                ></textarea>
                                {errors.comment ? (
                                    <div className="error-msg">
                                        {errors.comment}
                                    </div>
                                ) : null}
                                <button type="submit">ارسال نظر</button>
                            </form>
                        </div>
                    )}
                </div>
                <SingleCommentsList
                    comments={comments}
                    article_id={article.data.id}
                />
            </div>
            <ToastContainer />
        </>
    );
}
