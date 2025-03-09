import { client } from "@/sanity/lib/client";
import clsx from "clsx";
import { useEffect, useState } from "react";

type FilterProps = {
  isSelected: boolean;
  label: string;
  handleSelectFilter: () => void;
};

export async function getPostCategories() {
  const query = `*[_type == "category"] {
    title,
    slug
  }`;
  const data = await client.fetch(query);
  return data;
}

function Filter({ isSelected, label, handleSelectFilter }: FilterProps) {
  return (
    <button
      onClick={handleSelectFilter}
      className={clsx(
        "rounded-[10px] border-black border py-1.5 px-3 uppercase font-button text-xs font-semibold leading-4",
        isSelected ? "text-black bg-pink" : "text-pink bg-white"
      )}
    >
      {label}
    </button>
  );
}

type CategoryType = {
  title: string;
  _id: string;
  slug: {
    current: string;
  };
};
type FiltersProps = {
  selectedCategory: string | null;
  setSelectedCategoryAction: (category: string | null) => void;
};
export function Filters({
  selectedCategory,
  setSelectedCategoryAction,
}: FiltersProps) {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  useEffect(() => {
    const asyncFn = async () => {
      const data = await getPostCategories();
      setCategories(data);
    };
    asyncFn();
  }, []);

  return (
    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
      <Filter
        label="VSE"
        isSelected={selectedCategory === null}
        handleSelectFilter={() => setSelectedCategoryAction(null)}
      />
      {categories.map((category) => (
        <Filter
          key={category.title}
          label={category.title}
          isSelected={selectedCategory === category.slug.current}
          handleSelectFilter={() =>
            setSelectedCategoryAction(category.slug.current)
          }
        />
      ))}
    </div>
  );
}
