import React from 'react';
import { Form, Button } from 'antd';
import { MForm } from 'min';
import Utils from 'min/utils';

const { getFields, validate } = Utils.Form;

const fields = [
  {
    key: 'name',
    name: '名称',
    required: true,
  }, {
    key: 'gender',
    name: '性别',
    enums: {
      MALE: '男',
      FAMALE: '女',
    },
  }, {
    key: 'birthday',
    name: '生日',
    type: 'date',
  }, {
    key: 'desc',
    name: '自我介绍',
    type: 'textarea',
  },
];

let results = {};

function MFormGenBase({ form }) {
  const formProps = {
    fields: getFields(fields).values(),
    item: {},
    form,
  };
  const onSubmit = () => {
    validate(form, fields)((values) => {
      results = values;
    });
  };

  return (
    <div>
      <MForm {...formProps} />
      <Button onClick={onSubmit} type="primary" >提交</Button>
      <div style={{ background: '#f2f2f2', padding: '10px', marginTop: '10px' }}>
        <pre>{JSON.stringify(results, null, 2)}</pre>
      </div>
    </div>
  );
}

export default Form.create()(MFormGenBase);
