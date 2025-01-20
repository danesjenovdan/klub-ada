import clsx from "clsx";

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

type FiltersProps = {
  selectedCategory: string;
  setSelectedCategoryAction: (category: string) => void;
};
export function Filters({
  selectedCategory,
  setSelectedCategoryAction,
}: FiltersProps) {
  const FILTERS = [
    "Vse",
    "Iskanje službe",
    "Kako postanem...",
    "Mehke veščine",
    "Tehnično znanje",
    "Ženske v tehnologiji",
  ];
  return (
    <div className="flex gap-2">
      {FILTERS.map((filter) => (
        <Filter
          key={filter}
          label={filter}
          isSelected={selectedCategory === filter}
          handleSelectFilter={() => setSelectedCategoryAction(filter)}
        />
      ))}
    </div>
  );
}
