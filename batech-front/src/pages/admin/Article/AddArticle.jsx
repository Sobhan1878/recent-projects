import AdminLayout from "../../../layout/admin/AdminLayout";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import "./addArticle.css";
import { BsCameraFill } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import Modal from "react-modal";
import { useEffect, useRef, useState } from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import Request from "../../../services/request";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import {
    addArticleValidation,
    availableFormats,
} from "../../../services/formValidationSchema";
import AdminLoading from "../components/AdminLoading";

Modal.setAppElement("#root");

const req = new Request();

export default function AddArticle({ editableArticle }) {
    const [openModal, setOpenModal] = useState(false);
    const [articleCoverUrl, setArticleCoverUrl] = useState("");
    const [cropper, setCropper] = useState({});
    const [loading, setLoading] = useState(false);
    const [croppedImg, setCroppedImg] = useState({
        base64: "",
        name: "",
        type: "",
        size: "",
    });
    const [categories, setCategories] = useState({});
    const imgInput = useRef();
    const [subcategories, setSubcategories] = useState({
        all: [],
        current: [],
    });
    let {
        handleChange,
        handleSubmit,
        values,
        errors,
        resetForm,
        setValues,
        setErrors,
    } = useFormik({
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
            setCroppedImg({
                preview: "",
                base64: "",
                blob: "",
            });
            imgInput.current.value = "";
        },
    });

    useEffect(() => {
        if (!Object.values(categories).length) {
            req.get("category/").then((res) => setCategories(res.data));
        }
    }, [categories]);

    useEffect(() => {
        if (!Object.values(subcategories.all).length) {
            req.get("subcategory/").then((res) =>
                setSubcategories({ ...subcategories, all: res.data })
            );
        }
    }, [subcategories]);

    useEffect(() => {
        if (!Object.values(croppedImg).includes("")) {
            const e = {
                target: {
                    value: croppedImg,
                    name: "thumbnail",
                },
            };
            handleChange(e);
        }
    }, [croppedImg]);

    useEffect(() => {
        if (editableArticle && Object.values(editableArticle).length) {
            setValues(editableArticle);
        }
    }, [editableArticle]);

    useEffect(() => {
        if (values.category_id && subcategories.all.length) {
            const currenSubs = subcategories.all.filter(
                (subcategory) => subcategory.category_id == values.category_id
            );
            setSubcategories({ ...subcategories, current: currenSubs });
        }
    }, [subcategories.all]);

    const handleCoverChange = (e) => {
        const [file] = e.target.files;
        if (file && !availableFormats.includes(file.type)) {
            setErrors({
                thumbnail:
                    "فقط می‌توانید فرمت‌های ( jpg - png - webp ) آپلود کنید.",
            });
            return;
        }
        setOpenModal(true);
        setCroppedImg({
            ...croppedImg,
            name: file.name,
            type: file.type,
            size: file.size,
        });
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
        const img = cropper.getCroppedCanvas().toDataURL(croppedImg.type);
        setCroppedImg({
            ...croppedImg,
            base64: img,
        });
        handleCloseModal();
    };

    const handleGetSubcategories = (e) => {
        const currenSubs = subcategories.all.filter(
            (subcategory) => subcategory.category_id == e.target.value
        );
        setSubcategories({ ...subcategories, current: currenSubs });
    };

    const handleImageUpload = (file, info, core, handler) => {
        const formData = new FormData();
        formData.append("file", file[0]);
        req.post("article/uploadContentImages/", formData).then((img) => {
            let res = {
                result: [
                    {
                        url: `http://localhost:8000/storage/${img}`,
                    },
                ],
            };
            handler(res);
        });
    };

    return (
        <AdminLayout>
            <h3 className="site-title">
                {editableArticle ? "ویرایش مقاله" : "افزودن مقاله جدید"}
            </h3>
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
                            value={values.category_id}
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
                            value={values.subcategory_id}
                        >
                            <option value=""></option>
                            {subcategories.current.length
                                ? subcategories.current.map((subcategory) => {
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
                            value={values.title}
                        />
                        {errors.title ? (
                            <div className="error-msg">{errors.title}</div>
                        ) : null}
                    </div>
                    <div className="form-item">
                        <label htmlFor="subtitle">پیش‌نویس مقاله</label>
                        <input
                            type="text"
                            name="subtitle"
                            id="subtitle"
                            onChange={handleChange}
                            value={values.subtitle}
                        />
                        {errors.subtitle ? (
                            <div className="error-msg">{errors.subtitle}</div>
                        ) : null}
                    </div>
                    <div className="form-item">
                        <label htmlFor="slug">نامک مقاله</label>
                        <input
                            type="text"
                            name="slug"
                            id="slug"
                            onChange={handleChange}
                            value={values.slug}
                        />
                        {errors.slug ? (
                            <div className="error-msg">{errors.slug}</div>
                        ) : null}
                    </div>
                    <div className="form-item">
                        <label htmlFor="subtitle">محتوای مقاله</label>
                        <SunEditor
                            setOptions={{ buttonList: buttonList.complex }}
                            setDefaultStyle="font-family: estedad; text-shadow: none; font-size: 14px"
                            name="content"
                            onImageUploadBefore={handleImageUpload}
                            onChange={(val) => {
                                const e = {
                                    target: {
                                        value: val,
                                        name: "content",
                                    },
                                };
                                handleChange(e);
                            }}
                            setContents={values.content}
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
                                ref={imgInput}
                            />
                            <BsCameraFill />
                            <span>برای انتخاب عکس کلیک کنید.</span>
                        </div>
                        {errors.thumbnail ? (
                            <div className="error-msg">{errors.thumbnail}</div>
                        ) : null}
                        {Object.values(croppedImg).length ||
                        Object.values(editableArticle).length ? (
                            <div className="output-cropped-img">
                                {editableArticle && !croppedImg.base64 ? (
                                    <img
                                        src={editableArticle.thumbnail}
                                        alt={editableArticle.thumbnail}
                                    />
                                ) : (
                                    <img
                                        src={croppedImg.base64}
                                        alt={croppedImg.base64}
                                    />
                                )}
                            </div>
                        ) : null}
                    </div>
                    <div className="form-item">
                        <label htmlFor="head-news">مقاله هدر سایت</label>
                        <div className="custom-file-input">
                            <span
                                className={`custom-checkbox ${
                                    values.head_news ? "active" : ""
                                }`}
                            >
                                <input
                                    type="checkbox"
                                    name="head_news"
                                    id="head_news"
                                    onChange={() => {
                                        const value = !values.head_news;
                                        const val = {
                                            target: {
                                                value,
                                                name: "head_news",
                                            },
                                        };
                                        handleChange(val);
                                    }}
                                    value={values.head_news}
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
            {loading && <AdminLoading />}
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
                        zIndex: "100",
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
