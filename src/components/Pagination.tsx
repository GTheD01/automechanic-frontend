import useIsLessThan from "@/hooks/useIsLessThan";

export const Pagination = ({
  totalPages,
  currentPage,
  handleCurrentPage,
}: {
  totalPages: number;
  currentPage: number;
  handleCurrentPage: any;
}) => {
  const smWidth = useIsLessThan(600);
  const mdWidth = useIsLessThan(830);

  let minLen = 7;
  if (smWidth) {
    minLen = 3;
  } else if (mdWidth) {
    minLen = 5;
  }

  const maxStartPage = Math.max(1, currentPage - (minLen - 2));
  const maxEndPage = Math.min(totalPages, currentPage + 7);

  const pagesToDisplay = Array.from(
    { length: Math.min(maxEndPage - maxStartPage + 1, minLen) },
    (_, index) => maxStartPage + index
  );

  return (
    <div className="flex items-center justify-center gap-12 py-6">
      {pagesToDisplay.map((el) => (
        <div
          key={el}
          onClick={() => handleCurrentPage(el)}
          className={`text-primary w-8 h-8 flex justify-center items-center rounded-full hover:bg-primary hover:text-white cursor-pointer ${
            currentPage === el ? "bg-primary text-white" : ""
          }`}
        >
          {el}
        </div>
      ))}
    </div>
  );
};
