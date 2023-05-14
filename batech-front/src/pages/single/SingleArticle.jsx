import React, { useEffect, useState } from "react";
import ClientLayout from "../../layout/client/ClientLayout";
import { Link, Navigate, useParams } from "react-router-dom";
import ClientLoading from "../../layout/client/components/ClientLoading";
import moment from "jalali-moment";
import parse from "html-react-parser";
import "./singleArticle.css";
import { useDispatch, useSelector } from "react-redux";
import {
    emptySingleData,
    getArticle,
    getComments,
    getLastArticles,
    getSimilarArticles,
    offLoading,
    onLoading,
} from "../../redux/reducers/singleArticleReducer";
import { useLayoutEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { getMostViewArticles } from "../../redux/reducers/homeReducer";
import HeadNewsCard from "../../components/HeadNewsCard";
import commentLogo from "../../assets/img/comments.png";
import noAvatar from "../../assets/img/users/noavatar.png";
import { FaRegHeart } from "react-icons/fa";
import { MdReply } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import { infoToast, successToast } from "../../services/toastMessages";
import { useFormik } from "formik";
import { addCommentValidation } from "../../services/formValidationSchema";
import Request from "../../services/request";

export default function SingleArticle() {
    const params = useParams();
    const dispatch = useDispatch();
    const [addCommentForm, setAddCommentForm] = useState(false);
    const { article, loading, lastArticles, similarArticles, comments } =
        useSelector((state) => state.singleArticle);
    const { mostViewArticles } = useSelector((state) => state.home);

    useEffect(() => {
        if (
            Object.values(lastArticles).length &&
            Object.values(article).length &&
            Object.values(mostViewArticles).length &&
            Object.values(similarArticles).length &&
            Object.values(comments).length
        ) {
            dispatch(offLoading());
        }
    }, [article, lastArticles, mostViewArticles, similarArticles, comments]);

    useLayoutEffect(() => {
        dispatch(getArticle(params.slug));

        return () => dispatch(emptySingleData());
    }, [params]);

    useEffect(() => {
        if (!Object.values(lastArticles).length) {
            dispatch(getLastArticles());
        }
    }, [lastArticles]);

    useEffect(() => {
        if (!Object.values(similarArticles).length) {
            dispatch(getSimilarArticles(params.slug));
        }
    }, [similarArticles]);

    useEffect(() => {
        if (!Object.values(mostViewArticles).length) {
            dispatch(getMostViewArticles());
        }
    }, [mostViewArticles]);

    useEffect(() => {
        if (!Object.values(comments).length && Object.values(article).length) {
            dispatch(getComments(article.data.id));
        }
    }, [comments, article]);

    const { handleSubmit, values, errors, setValues, resetForm } = useFormik({
        initialValues: {
            comment: "",
        },
        onSubmit: async () => {
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

    console.log(values);

    return loading ? (
        <ClientLoading />
    ) : (
        <ClientLayout>
            <div className="single-article">
                <div className="single-sidebar">
                    <h3 className="site-title">جدیدترین مطالب</h3>
                    <div className="single-last-articles">
                        {lastArticles.map((lastArticle) => {
                            return (
                                <Link
                                    to={`/${lastArticle.en_category}/${lastArticle.slug}`}
                                    key={lastArticle.slug}
                                >
                                    <div className="last-article-item">
                                        <p>{lastArticle.title}</p>
                                        <img
                                            src={`${lastArticle.thumbnail}`}
                                            alt={`${lastArticle.thumbnail}`}
                                        />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                    <div className="single-similar-articles">
                        <h3 className="site-title">مطالب مشابه</h3>
                        <Swiper slidesPerView={1} spaceBetween={30}>
                            {similarArticles.data.map((article) => (
                                <SwiperSlide key={article.slug}>
                                    <HeadNewsCard article={article} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className="single-most-viewd-articles">
                        <h3 className="site-title">پربازدیدترین مطالب</h3>
                        <div className="single-last-articles">
                            {mostViewArticles.data.map((mostViewArticle) => {
                                return (
                                    <Link
                                        to={`/${mostViewArticle.en_category}/${mostViewArticle.slug}`}
                                        key={mostViewArticle.slug}
                                    >
                                        <div className="last-article-item">
                                            <p>{mostViewArticle.title}</p>
                                            <img
                                                src={`${mostViewArticle.thumbnail}`}
                                                alt={`${mostViewArticle.thumbnail}`}
                                            />
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="single-content">
                    <div className="single-article-title">
                        <h2>{article.data.title}</h2>
                    </div>
                    <div className="single-article-info">
                        <div className="single-category-time">
                            <span>{article.data.fa_category}</span>
                            <span>{article.data.subcategory}</span>
                            <span>
                                {moment(article.data.create_time)
                                    .locale("fa")
                                    .format("dddd D MMMM y")}
                            </span>
                        </div>
                        <div className="single-author">
                            <span>سبحان کاظمی</span>
                        </div>
                    </div>
                    <div className="single-article-cover">
                        <img
                            src={`${article.data.thumbnail}`}
                            alt={`${article.data.thumbnail}`}
                        />
                    </div>
                    <div className="single-article-content">
                        {parse(article.data.content)}
                    </div>
                    <div className="single-comments">
                        <h3 className="site-title">نظرات</h3>
                        <div className="comments-header">
                            <div className="comment-logo">
                                <img src={commentLogo} alt={commentLogo} />
                            </div>
                            <span>30 دیدگاه ثبت شده، نظر تو چیه؟</span>
                            {!addCommentForm && (
                                <button
                                    type="submit"
                                    onClick={handleAddComment}
                                >
                                    ثبت دیدگاه
                                </button>
                            )}
                            {addCommentForm && (
                                <div className="add-comment-form">
                                    <form onSubmit={handleSubmit}>
                                        <textarea
                                            name="comment"
                                            id="comment"
                                            cols="0"
                                            rows="3"
                                            placeholder="نظر خود را بنویسید ..."
                                            onChange={(e) =>
                                                setValues({
                                                    user_id: JSON.parse(
                                                        sessionStorage.getItem(
                                                            "user"
                                                        )
                                                    )["id"],
                                                    article_id: article.data.id,
                                                    [e.target.name]:
                                                        e.target.value,
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
                        <div className="single-comments-list">
                            {comments.data.map((comment) => {
                                return (
                                    <div className="comment-item">
                                        <div className="comment-user-info">
                                            <div className="user-avatar">
                                                <img
                                                    src={noAvatar}
                                                    alt={noAvatar}
                                                />
                                            </div>
                                            <strong>{comment.author}</strong>
                                            <span>
                                                {moment(comment.create_time)
                                                    .locale("fa")
                                                    .fromNow()}
                                            </span>
                                        </div>
                                        <div className="comment-body">
                                            <p>{comment.body}</p>
                                            <div className="comment-actions">
                                                <div className="comment-like-action">
                                                    <FaRegHeart />
                                                </div>
                                                <div className="comment-reply-action">
                                                    <MdReply />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <ToastContainer />
                    </div>
                </div>
            </div>
        </ClientLayout>
    );
}
