export default function CategoriesWrapper({ categories }) {
    return (
        <div className="category-wrapper">
            <ul>
                {categories.map((category) => (
                    <li key={category.slug}>{category.fa_title}</li>
                ))}
            </ul>
        </div>
    );
}
