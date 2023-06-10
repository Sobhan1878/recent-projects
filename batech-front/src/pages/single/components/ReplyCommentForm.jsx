import { useFormik } from "formik";
import { addCommentValidation } from "../../../services/formValidationSchema";
import { successToast } from "../../../services/toastMessages";
import Request from "../../../services/request";
import { useDispatch } from "react-redux";
import { addComment } from "../../../redux/reducers/singleArticleReducer";
import { nanoid } from "@reduxjs/toolkit";

export default function ReplyCommentForm({
    comment_id,
    article_id,
    setActiveReplyForm,
}) {
    const dispatch = useDispatch();
    const { values, errors, handleSubmit, handleChange, resetForm } = useFormik(
        {
            initialValues: {
                id: nanoid(),
                comment: "",
                user_id: JSON.parse(sessionStorage.getItem("user"))["id"],
                name: JSON.parse(sessionStorage.getItem("user"))["name"],
                article_id: article_id,
                comment_id: comment_id,
                type: "answer",
                parent_comment: "",
            },
            validationSchema: addCommentValidation,
            onSubmit: async () => {
                dispatch(addComment(values));
                setActiveReplyForm("");
                const result = await new Request().post("comment/", values);
                if (result.status === 201) {
                    successToast(result.message);
                }
                resetForm();
            },
        }
    );

    console.log(values);

    return (
        <div className="comment-form reply-comment">
            <form onSubmit={handleSubmit}>
                <textarea
                    name="comment"
                    id="comment"
                    cols="0"
                    rows="3"
                    placeholder="پاسخ خود را بنویسید ..."
                    onChange={handleChange}
                    value={values.comment}
                ></textarea>
                {errors.comment ? (
                    <div className="error-msg">{errors.comment}</div>
                ) : null}
                <div className="comment-submit-btns">
                    <button type="submit">ارسال پاسخ</button>
                    <button
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            setActiveReplyForm("");
                        }}
                    >
                        بستن
                    </button>
                </div>
            </form>
        </div>
    );
}
