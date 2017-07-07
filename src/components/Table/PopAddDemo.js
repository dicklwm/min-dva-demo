/** Created by Min on 2017-07-06.  */
import React from 'react';
import { Form, Popover, Button } from 'antd';
import { MForm, Utils } from 'min-dva';

const { validate } = Utils.Form;

const fields = [
  {
    key: 'name',
    name: '名称',
    required: true,
  },
  {
    key: 'email',
    name: '邮箱',
  },
  {
    key: 'status',
    name: '状态',
    inputProps: {
      getPopupContainer: triggerNode => triggerNode,
    },
    enums: {
      1: '启用',
      2: '禁用',
    },
  },
];

function PopAddDemo({ form, children, dispatch }) {
  function handleSubmit() {
    validate(form)(
      (values, tv) => {
        dispatch({
          type: 'Table/EditTableDemo/add_user',
          payload: values,
        });
      },
      (errors) => {
        console.log(errors);
      },
    );
  }

  function handleReset() {
    form.resetFields();
  }

  return (
    <Popover
      title="新增用户"
      trigger="click"
      placement="rightBottom"
      content={
        <div>
          <MForm
            form={form}
            fields={fields}
            style={{ width: 300 }}
            layout={{
              labelCol: { span: 6 },
              wrapperCol: { span: 18 },
            }}
          />
          <div style={{ textAlign: 'right' }}>
            <Button onClick={handleReset} style={{ marginRight: 6 }} type="danger">重置</Button>
            <Button onClick={handleSubmit} type="primary">确定</Button>
          </div>
        </div>
      }
    >
      {children}
    </Popover>
  );
}

export default Form.create()(PopAddDemo);
