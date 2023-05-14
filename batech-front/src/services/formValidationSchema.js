import * as yup from "yup";

export const addCategoryValidation = yup.object().shape({
    en_title: yup
        .string()
        .required("فیلد عنوان انگلیسی الزامی است.")
        .min(3, "عنوان انگلیسی باید بیشتر از 3 کاراکتر باشد."),
    fa_title: yup
        .string()
        .required("فیلد عنوان فارسی الزامی است.")
        .min(3, "عنوان فارسی باید بیشتر از 3 کاراکتر باشد."),
    slug: yup
        .string()
        .required("فیلد نامک الزامی است.")
        .min(3, "نامک باید بیشتر از 3 کاراکتر باشد."),
});

export const addSubcategoryValidation = yup.object().shape({
    category_id: yup.number().required("فیلد دسته‌بندی الزامی است."),
    en_title: yup
        .string()
        .required("فیلد عنوان انگلیسی الزامی است.")
        .min(3, "عنوان انگلیسی باید بیشتر از 3 کاراکتر باشد."),
    fa_title: yup
        .string()
        .required("فیلد عنوان فارسی الزامی است.")
        .min(3, "عنوان فارسی باید بیشتر از 3 کاراکتر باشد."),
    slug: yup
        .string()
        .required("فیلد نامک الزامی است.")
        .min(3, "نامک باید بیشتر از 3 کاراکتر باشد."),
});

export const addArticleValidation = yup.object().shape({
    category_id: yup.number().required("فیلد دسته‌بندی الزامی است."),
    subcategory_id: yup.number().required("فیلد زیر دسته‌بندی الزامی است."),
    slug: yup
        .string()
        .required("فیلد نامک الزامی است.")
        .min(4, "نامک باید بیشتر از 4 کاراکتر باشد."),
    title: yup
        .string()
        .required("فیلد عنوان الزامی است.")
        .min(12, "عنوان باید بیشتر از 12 کاراکتر باشد."),
    subtitle: yup
        .string()
        .required("فیلد پیش‌نویس الزامی است.")
        .min(12, "عنوان باید بیشتر از 12 کاراکتر باشد."),
    content: yup.string().required("فیلد محتوا الزامی است."),
    thumbnail: yup
        .mixed()
        .required("فیلد کاور مقاله الزامی است.")
        .test(
            "FILE_SIZE",
            "حجم عکس باید کمتر از 500 کیلوبایت باشد.",
            (file) => typeof file === "string" || file.size / 1000 < 500
        ),
    head_news: yup.bool().nullable(),
});

export const availableFormats = ["image/jpeg", "image/png", "image/webp"];

export const registerValidation = yup.object().shape({
    username: yup.string().required("نام کاربری الزامی است."),
    email: yup
        .string()
        .email("ایمیل معتبر وارد کنید.")
        .required("ایمیل الزامی است."),
    password: yup
        .string()
        .required("رمز عبور الزامی است.")
        .min(8, "حداقل ۸ کاراکتر وارد کنید."),
    confirm_password: yup
        .string()
        .required("تایید رمز عبور الزامی است.")
        .oneOf([yup.ref("password")], "با رمز عبور برابر نیست."),
});

export const loginValidation = yup.object().shape({
    username: yup.string().required("نام کاربری الزامی است."),
    password: yup
        .string()
        .required("رمز عبور الزامی است.")
        .min(8, "حداقل ۸ کاراکتر وارد کنید."),
});

export const addCommentValidation = yup.object().shape({
    comment: yup
        .string()
        .required("نظر خود را بنویسید.")
        .min(4, "نظر شما کوتاه است."),
});
