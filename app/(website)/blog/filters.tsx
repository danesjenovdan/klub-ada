"use client";

import { useSanityData } from "@/app/utils/use-sanity-data";
import clsx from "clsx";

const FILTERS_QUERY = `*[_type == "category"] {
  title,
  slug
}`;

type FilterProps = {
  isSelected: boolean;
  label: string;
  handleSelectFilter: () => void;
};

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
  const { data } = useSanityData({
    query: FILTERS_QUERY,
  });

  const categories = (data || []) as CategoryType[];

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
