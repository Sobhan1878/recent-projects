import AdminLayout from "../../../layout/admin/AdminLayout";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import "./addArticle.css";

export default function AddArticle() {
    return (
        <AdminLayout>
            <h3 className="site-title">افزودن مقاله جدید</h3>
            <div className="admin-form add-article-form">
                <div className="form-item">
                    <label htmlFor="category">دسته‌بندی مقاله</label>
                    <select name="category" id="category">
                        <optgroup>
                            <option value="">علمی</option>
                        </optgroup>
                    </select>
                </div>
                <div className="form-item">
                    <label htmlFor="subcategory">زیر دسته‌بندی مقاله</label>
                    <select name="subcategory" id="subcategory">
                        <optgroup>
                            <option value="">عناصر</option>
                            <option value="">فیزیک</option>
                        </optgroup>
                    </select>
                </div>
                <div className="form-item">
                    <label htmlFor="title">عنوان مقاله</label>
                    <input type="text" name="title" id="title" />
                </div>
                <div className="form-item">
                    <label htmlFor="title">عنوان مقاله</label>
                    <input type="text" name="title" id="title" />
                </div>
                <div className="form-item">
                    <label htmlFor="subtitle">پیش‌نویس مقاله</label>
                    <input type="text" name="subtitle" id="subtitle" />
                </div>
                <div className="form-item">
                    <label htmlFor="subtitle">محتوای مقاله</label>
                    <SunEditor
                        setOptions={{ buttonList: buttonList.complex }}
                        setDefaultStyle="font-family: estedad; text-shadow: none; font-size: 14px"
                    />
                </div>
            </div>
        </AdminLayout>
    );
}
