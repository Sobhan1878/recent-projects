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
    thumbnail: yup.string().required("فیلد کاور مقاله الزامی است."),
    head_news: yup.array(),
});
