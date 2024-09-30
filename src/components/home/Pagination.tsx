import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../redux/paginationSlice";
import type { AppDispatch, RootState } from "../../redux/store";

export const Pagination = () => {
  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage,
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (next: number) => {
    dispatch(setCurrentPage(next));
  };
  return (
    <div>
      <button
        type="button"
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 mr-2 bg-slate-300 border-solid	hover:bg-slate-400"
      >
        ＜＜
      </button>
      <button
        type="button"
        disabled={currentPage === 9}
        onClick={() => handleClick(currentPage + 1)}
        className="p-2 ml-2 bg-slate-300 border-solid hover:bg-slate-400"
      >
        ＞＞
      </button>
    </div>
  );
};
