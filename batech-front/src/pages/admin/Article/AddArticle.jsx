import AdminLayout from "../../../layout/admin/AdminLayout";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import "./addArticle.css";
import { BsCameraFill } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import Request from "../../../services/request";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { addArticleValidation } from "../../../services/formValidationSchema";
import { ScaleLoader } from "react-spinners";

Modal.setAppElement("#root");

const req = new Request();

export default function AddArticle() {
    const [openModal, setOpenModal] = useState(false);
    const [articleCoverUrl, setArticleCoverUrl] = useState("");
    const [cropper, setCropper] = useState({});
    const [loading, setLoading] = useState(false);
    const [croppedImg, setCroppedImg] = useState({
        preview: "",
        base64: "",
        blob: "",
    });
    const [categories, setCategories] = useState({});
    const [subcategories, setSubcategories] = useState({});
    const { handleChange, handleSubmit, values, errors, touched, resetForm } =
        useFormik({
            initialValues: {
                category_id: "",
                subcategory_id: "",
                slug: "",
                title: "",
                subtitle: "",
                content: "",
                thumbnail: "",
                head_news: "",
            },
            validationSchema: addArticleValidation,
            onSubmit: async () => {
                setLoading(true);
                const result = await req.post("article/", values);
                if (result.message) {
                    setLoading(false);
                }
                toast.success(
                    result.message === "created" ? "با موفقیت ایجاد شد." : null,
                    {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        toastId: "customToast",
                    }
                );
                resetForm();
            },
        });

    useEffect(() => {
        if (!Object.values(categories).length) {
            req.get("category/").then((res) => setCategories(res.data));
        }
    }, [categories]);

    useEffect(() => {
        if (croppedImg.blob) {
            const reader = new FileReader();
            reader.readAsDataURL(croppedImg.blob);
            reader.onloadend = function () {
                setCroppedImg({
                    ...croppedImg,
                    base64: reader.result,
                });
            };
        }
        if (croppedImg.base64) {
            const e = {
                target: {
                    value: croppedImg.base64,
                    name: "thumbnail",
                },
            };
            handleChange(e);
        }
    }, [croppedImg.blob, croppedImg.base64]);

    const handleCoverChange = (e) => {
        setOpenModal(true);
        const [file] = e.target.files;
        setArticleCoverUrl(URL.createObjectURL(file));
    };

    const afterOpenModal = () => {
        const uploaded_img = document.createElement("img");
        uploaded_img.src = articleCoverUrl;
        document.querySelector(".croppable-img").appendChild(uploaded_img);
        setCropper(
            new Cropper(document.querySelector(".croppable-img img"), {
                aspectRatio: 1920 / 1280,
                viewMode: 2,
                dragMode: "move",
                preview: document.querySelector(".crop-img-preview"),
            })
        );
    };

    const handleCloseModal = () => {
        cropper.destroy();
        setCropper({});
        setOpenModal(false);
    };

    const handleCropImage = () => {
        cropper.getCroppedCanvas().toBlob((blob) => {
            setCroppedImg({
                ...croppedImg,
                preview: URL.createObjectURL(blob),
                blob,
            });
        });
        handleCloseModal();
    };

    const handleGetSubcategories = (e) => {
        req.get(`subcategory/category_id/${e.target.value}/`).then((res) =>
            setSubcategories(res.data)
        );
    };

    console.log(values);

    return (
        <AdminLayout>
            <h3 className="site-title">افزودن مقاله جدید</h3>
            <div className="admin-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-item">
                        <label htmlFor="category_id">دسته‌بندی مقاله</label>
                        <select
                            name="category_id"
                            id="category_id"
                            onChange={(e) => {
                                handleChange(e);
                                handleGetSubcategories(e);
                            }}
                        >
                            <option value=""></option>
                            {categories.length
                                ? categories.map((category) => {
                                      return (
                                          <option
                                              value={category.id}
                                              key={category.id}
                                          >
                                              {category.fa_title}
                                          </option>
                                      );
                                  })
                                : null}
                        </select>
                        {errors.category_id ? (
                            <div className="error-msg">
                                {errors.category_id}
                            </div>
                        ) : null}
                    </div>
                    <div className="form-item">
                        <label htmlFor="subcategory_id">
                            زیر دسته‌بندی مقاله
                        </label>
                        <select
                            name="subcategory_id"
                            id="subcategory_id"
                            onChange={handleChange}
                        >
                            <option value=""></option>
                            {subcategories.length
                                ? subcategories.map((subcategory) => {
                                      return (
                                          <option
                                              value={subcategory.id}
                                              key={subcategory.id}
                                          >
                                              {subcategory.fa_title}
                                          </option>
                                      );
                                  })
                                : null}
                        </select>
                        {errors.subcategory_id ? (
                            <div className="error-msg">
                                {errors.subcategory_id}
                            </div>
                        ) : null}
                    </div>
                    <div className="form-item">
                        <label htmlFor="title">عنوان مقاله</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            onChange={handleChange}
                        />
                        {errors.title ? (
                            <div className="error-msg">{errors.title}</div>
                        ) : null}
                    </div>
                    <div className="form-item">
                        <label htmlFor="slug">نامک مقاله</label>
                        <input
                            type="text"
                            name="slug"
                            id="slug"
                            onChange={handleChange}
                        />
                        {errors.slug ? (
                            <div className="error-msg">{errors.slug}</div>
                        ) : null}
                    </div>
                    <div className="form-item">
                        <label htmlFor="subtitle">پیش‌نویس مقاله</label>
                        <input
                            type="text"
                            name="subtitle"
                            id="subtitle"
                            onChange={handleChange}
                        />
                        {errors.subtitle ? (
                            <div className="error-msg">{errors.subtitle}</div>
                        ) : null}
                    </div>
                    <div className="form-item">
                        <label htmlFor="subtitle">محتوای مقاله</label>
                        <SunEditor
                            setOptions={{ buttonList: buttonList.complex }}
                            setDefaultStyle="font-family: estedad; text-shadow: none; font-size: 14px"
                            name="content"
                            onChange={(val) => {
                                const e = {
                                    target: {
                                        value: val,
                                        name: "content",
                                    },
                                };
                                handleChange(e);
                            }}
                        />
                        {errors.content ? (
                            <div className="error-msg">{errors.content}</div>
                        ) : null}
                    </div>
                    <div className="form-item">
                        <label htmlFor="thumbnail">کاور مقاله</label>
                        <div className="custom-file-input">
                            <input
                                type="file"
                                name="thumbnail"
                                id="thumbnail"
                                onChange={handleCoverChange}
                            />
                            <BsCameraFill />
                            <span>برای انتخاب عکس کلیک کنید.</span>
                        </div>
                        {errors.thumbnail ? (
                            <div className="error-msg">{errors.thumbnail}</div>
                        ) : null}
                        {Object.values(croppedImg).length ? (
                            <div className="output-cropped-img">
                                <img
                                    src={croppedImg.preview}
                                    alt={croppedImg.preview}
                                />
                            </div>
                        ) : null}
                    </div>
                    <div className="form-item">
                        <label htmlFor="head-news">مقاله هدر سایت</label>
                        <div className="custom-file-input">
                            <span
                                className={`custom-checkbox ${
                                    values.head_news.length > 0 ? "active" : ""
                                }`}
                            >
                                <input
                                    type="checkbox"
                                    name="head_news"
                                    id="head_news"
                                    onChange={handleChange}
                                />
                            </span>
                            <span className="check-box-label">
                                از مقالات هدر سایت نیست.
                            </span>
                        </div>
                        {errors.head_news ? (
                            <div className="error-msg">{errors.head_news}</div>
                        ) : null}
                    </div>
                    <div className="submit-admin-form">
                        <button type="submit">ثبت</button>
                    </div>
                </form>
            </div>
            {loading && (
                <div className="loading">
                    <ScaleLoader color="#39609d" height={20} />
                </div>
            )}
            <ToastContainer />
            <Modal
                isOpen={openModal}
                style={{
                    content: {
                        border: "none",
                        background: "rgb(0 0 0 / 50%)",
                        backdropFilter: "blur(10px)",
                        width: "1000px",
                        margin: "auto",
                    },
                }}
                onAfterOpen={afterOpenModal}
            >
                <GrClose onClick={handleCloseModal} />
                <div className="modal-content">
                    <div className="cropper-section">
                        <div className="croppable-img"></div>
                        <div className="crop-options">
                            <div className="crop-img-preview"></div>
                            <button type="submit" onClick={handleCropImage}>
                                crop
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </AdminLayout>
    );
}
