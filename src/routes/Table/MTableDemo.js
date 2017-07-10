import React from 'react';
import { connect } from 'dva';
import { Badge, Alert, Input, DatePicker, Select, Tag, Button, Icon, Popover } from 'antd';
import { Utils, MTable } from 'min-dva';

const { getColumns } = Utils.Table;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;

const namespace = 'Table/MTableDemo';
const tableFields = [
  {
    key: 'name',
    name: '名称',
    sorter: (a, b) => a.name.length - b.name.length,
    width: 100,
  },
  {
    key: 'email',
    name: '邮箱',
    width: 100,
  },
  {
    key: 'create_at',
    title: '创建时间',
    width: 150,
  },
  {
    key: 'status',
    name: '状态',
    width: 50,
    filters: [
      {
        text: <Badge status="success" text="启用" />,
        value: '1',
      },
      {
        text: <Badge status="error" text="禁用" />,
        value: '2',
      },
    ],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
    render: value =>
      value === '1' ?
        <Badge status="success" text="启用" /> :
        <Badge status="error" text="禁用" />,
  }];

function MTableDemo({ data, loading, query, dispatch }) {
  const operatorColumn = [
    {
      key: 'operator',
      name: '操作',
      width: 60,
      // 扩展字段的render支持自定义渲染
      render: () => {
        return (
          <div>
            <Popover
              trigger="click"
              placement="bottomRight"
            />
            <Button icon="info" />
          </div>
        );
      },
    },
  ];
  const tools = [
    <Alert
      key="alert-tool"
      type="info"
      message={
        <div className="table-tool">
          <Input
            placeholder="输入名称或邮箱"
            addonBefore={<Icon type="search" />}
            style={{ marginRight: 12 }}
            value={query.keyword}
            onPressEnter={handleRefresh}
            onChange={e => handleQueryChange('keyword', e.target.value)}
          />
          <label
            style={{ marginRight: 12 }}
            htmlFor="RangePicker"
          >
            上传时间：
            <RangePicker
              id="RangePicker"
              value={query.dates}
              onChange={
                (value) => {
                  handleQueryChange('dates', value);
                  handleRefresh();
                }
              }
            />
          </label>

          <label htmlFor="status">
            状态：
            <Select
              id="status"
              style={{ width: 90, marginRight: 12 }}
              placeholder="选择状态"
              value={query.status}
              onChange={(value) => {
                handleQueryChange('status', value);
                handleRefresh();
              }}
            >
              <Option value="1">
                <span>
                  <Tag color="green">
                    <Icon type="check" />启用</Tag>
                </span>
              </Option>
              <Option value="2">
                <span>
                  <Tag color="red">
                    <Icon type="close" />禁用</Tag>
                </span>
              </Option>
            </Select>
          </label>

          <Button
            icon="search"
            type="primary"
            onClick={handleRefresh}
          >
            搜索
          </Button>
          <Button
            icon="delete"
            onClick={handleClearQuery}
          >
            重置
          </Button>
        </div>
      }
    />,
  ];
  const tableColumns = getColumns(tableFields).enhance(operatorColumn).values();
  const tableProps = {
    columns: tableColumns,
    dataSource: data,
    loading,
  };
  function handleQueryChange(key, value) {
    dispatch({
      type: `${namespace}/queryDataChange`,
      payload: {
        [key]: value,
      },
    });
  }

  function handleClearQuery() {
    dispatch({
      type: `${namespace}/clearQuery`,
    });
    handleRefresh();
  }

  function handleRefresh() {
    dispatch({
      type: `${namespace}/fetch`,
    });
  }

  return (

    <MTable
      tools={tools}
      tableProps={tableProps}
      type="max"
      height={500}
    />

  );
}
// 将model里面的state映射到组件中，先解构所有的state，获取当前namespace的state
// 再将其重命名为state，再返回当前namespace的state
const mapStateToProps = ({ [namespace]: state }) => state;

export default connect(mapStateToProps)(MTableDemo);
