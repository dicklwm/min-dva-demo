import React from 'react';
import { Table, Pagination } from 'antd';
import { needBread } from '../../utils/config';

function MTable({ tools, tableProps, paginationProps }) {
  return (
    <div>
      <Table
        // 默认为id
        rowKey="id"
        title={() =>
          tools ?
            <div className="table-title">
              {tools}
            </div> : null
        }
        // 有面包屑70，没面包屑10,头部48，表头56,页码76，可被覆盖
        scroll={{ y: document.body.clientHeight - (tools ? 48 : 0) - (needBread ? 70 : 10) - 68 - 56 - 76 }}
        pagination={
          paginationProps ?
          false :
          // 本地分页
          {
            className: 'fixed-pagination',
            showSizeChanger: true,
            showTotal: totalData => <span>共到 {totalData} 条数据</span>,
          }
        }
        {...tableProps}
      />
      {
        // 如果不传分页的Props就用本地的分页
        paginationProps ?
          <Pagination
            className="fixed-pagination"
            showSizeChanger
            showTotal={totalData => <span>共到 {totalData} 条数据</span>}
            {...paginationProps}
          />
          : null
      }
    </div>
  );
}

export default MTable;
