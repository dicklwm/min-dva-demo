/** Created by Min on 2017-07-04.  */
import React from 'react';
import { connect } from 'dva';
import { Badge, Alert, Input, DatePicker, Select, Tag, Button, Icon } from 'antd';
import { Utils, MEditTable, MTable } from 'min-dva';
import PopAddDemo from '../../components/Table/PopAddDemo';

const { getColumns } = Utils.Table;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;

const namespace = 'Table/EditTableDemo';

class EditTableDemo extends MEditTable {

  constructor(props) {
    super(props);
    // 请改写namespace
    // 因为需要连接model的命名空间才可以触发对应reducer或者effect
    this.namespace = namespace;
    this.tools = [
      <Alert
        key="alert-tool"
        type="info"
        message={
          <div className="table-tool">
            <Input
              placeholder="输入名称或邮箱"
              addonBefore={<Icon type="search" />}
              style={{ marginRight: 12 }}
            />
            <label
              style={{ marginRight: 12 }}
              htmlFor="RangePicker"
            >
              上传时间：
              <RangePicker
                id="RangePicker"
              />
            </label>

            <label htmlFor="status">
              状态：
              <Select
                id="status"
                style={{ width: 90, marginRight: 12 }}
                placeholder="选择状态"
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
            >
              搜索
            </Button>
            <Button
              icon="delete"
            >
              重置
            </Button>
          </div>
        }
      />,
      <div key="table-tool" className="table-tool" style={{ marginTop: 12 }}>
        <PopAddDemo
          dispatch={this.props.dispatch}
        >
          <Button
            icon="plus"
            type="primary"
          >
            新增用户
          </Button>
        </PopAddDemo>
      </div>,
    ];
  }

  handleSave = (changeData) => {
    // 返回了changeData，一整行可编辑的数据和对应行的id
    // 可以将changeData触发effect保存到服务器，或者先保存到model里面
    this.props.dispatch({
      type: `${namespace}/edit_user`,
      payload: changeData,
    });
  }
  handleDelete= (id) => {
    this.props.dispatch({
      type: `${namespace}/delete_user`,
      payload: id,
    })
  }

  render() {
    const tableFields = [
      {
        key: 'name',
        name: '名称',
        sorter: (a, b) => a.name.length - b.name.length,
        width: 100,
        editable: this.state.editable,
        status: this.state.status,
        onSave: this.handleEditChange,
      },
      {
        key: 'email',
        name: '邮箱',
        width: 100,
      },
      {
        key: 'status',
        name: '状态',
        width: 50,
        style: { width: 80 },
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
        enums: {
          1: '启用',
          2: '禁用',
        },
        editable: this.state.editable,
        status: this.state.status,
        onSave: this.handleEditChange,
        onFilter: (value, record) => record.status.indexOf(value) === 0,
        render: value => value === '1' ? <Badge status="success" text="启用" /> : <Badge status="error" text="禁用" />,
      },
      {
        key: 'create_at',
        title: '创建时间',
        type: 'datetime',
        width: 150,
        editable: this.state.editable,
        status: this.state.status,
        onSave: this.handleEditChange,
      },
    ];
    const op = [{
      key: 'op',
      title: '操作',
      width: 120,
      // 如不需要添加其他操作按钮可以直接用下面的语句
      // render: this.editButton,
      // 如果需要添加其它按钮
      render: (text, record, index) =>
        (
          <span className="table-tool">
            <label>
              <Button icon="info" />
            </label>
            {this.editButton(text, record, index)}
          </span>
        ),
    }];
    const tableColumns = getColumns(tableFields).enhance(op).values();
    const tableProps = {
      columns: tableColumns,
      dataSource: this.props.data,
    };
    return (
      <MTable
        tools={this.tools}
        tableProps={tableProps}
      />
    );
  }
}
// 将model里面的state映射到组件中，先解构所有的state，获取当前namespace的state
// 再将其重命名为state，再返回当前namespace的state
const mapStateToProps = ({ [namespace]: state }) => state;

export default connect(mapStateToProps)(EditTableDemo);
