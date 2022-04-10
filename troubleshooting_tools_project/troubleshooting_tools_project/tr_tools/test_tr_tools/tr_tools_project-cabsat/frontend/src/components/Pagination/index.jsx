import React from 'react'
import st from './style.module.css';

const Pagination = ({ page, from, to, rowsPerPage, all, setPage }) => {
  return (
    <>
      <div className={st.container}>
        <div className={st.txt}>
          Rows per page:
        </div>
        <div>
          {`${from} - ${to}`}
        </div>
        <div>
          {`of   ${all}`}
        </div>

        <div className={st.arrows}>
          <button onClick={() => setPage(val => ({ ...val, page: 0 }))} disabled={page === 0} >❮❮</button>
        </div>
        <div className={st.arrows}>
          <button
            onClick={() => setPage(val => ({ ...val, page: val.page - 1 }))}
            disabled={page === 0} >
            ❮
          </button>
        </div>
        <div className={st.arrows}>
          <button
            onClick={() => setPage(val => ({ ...val, page: val.page + 1 }))}
            disabled={page >= Math.ceil(all / rowsPerPage) - 1}>
            ❯
          </button>
        </div>
        <div className={st.arrows}>
          <button
            onClick={() => setPage(val => ({ ...val, page: Math.ceil(all / rowsPerPage) - 1 }))}
            disabled={page >= Math.ceil(all / rowsPerPage) - 1} >
            ❯❯
          </button>
        </div>
      </div>
    </>
  )
}
export default Pagination;
