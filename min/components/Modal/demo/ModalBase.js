import React from 'react';
import { Button } from 'antd';
import { MModal } from 'min';

function DetailModal(props) {
  return (
    <MModal
      title="测试框"
      {...props}
    >
      这是一个测试的modal
    </MModal>
  );
}

export default class ModalBase extends React.Component {

  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  handleModal() {
    this.setState({ visible: Symbol() });
  }

  render() {
    const { visible } = this.state;
    const modalProps = {
      visible,
      onOk: () => console.log('close'),
    };
    return (
      <div>
        <Button type="primary" onClick={() => this.handleModal()}>普通模态框</Button>
        <DetailModal {...modalProps} />
      </div>
    );
  }
}
