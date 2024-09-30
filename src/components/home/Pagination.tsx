import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from "../../redux/store";
import { setCurrentPage } from "../../redux/paginationSlice";

export const Pagination= () => {
  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage,
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (next: number) => {
    dispatch(setCurrentPage(next));
    console.log(currentPage);
  }
  return (
    <div>
      <button onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1} className="p-2 mr-2 bg-slate-300 border-solid	hover:bg-slate-400">＜＜</button>
      <button onClick={() => handleClick(currentPage + 1)} className="p-2 ml-2 bg-slate-300 border-solid hover:bg-slate-400">＞＞</button>
    </div>
  );
};
