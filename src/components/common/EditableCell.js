/** Created by Min on 2017/6/19.  */
import React from 'react';
// import PropsType from 'prop-types';
import { Input, DatePicker, InputNumber, Select } from 'antd';
import moment from 'moment';

const Option = Select.Option;

export default class EditableCell extends React.Component {

  state = {
    value: this.props.value,
    editable: this.props.editable || false,
  }

  // PropsType= {
  //   editable: PropsType.bool,  // 上层组件自行判断是否等于当前索引
  //   value: PropsType.string,
  //   status: PropsType.string,
  //   dataType: PropsType.dataType,
  //   options: PropsType.array,
  //   onSave: PropsType.func,
  //   style: PropTypes.object,
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value });
    }
    if (nextProps.editable !== this.state.editable) {
      this.setState({ editable: nextProps.editable });
      if (nextProps.editable) {
        this.cacheValue = this.state.value;
      }
    }
    if (nextProps.status && nextProps.status !== this.props.status) {
      if (nextProps.status === 'save') {
        this.props.onSave(this.state.value);
      } else if (nextProps.status === 'cancel') {
        this.setState({ value: this.cacheValue });
        this.props.onSave(this.cacheValue);
      }
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.editable !== this.state.editable ||
      nextState.value !== this.state.value ||
      nextProps.value !== this.state.value ||
      nextProps.status !== this.props.status;
  }

  handleChange = (e) => {
    const value = typeof e === 'object' ? e.target.value : e;
    if (this.props.maxLength) {
      if (value.length < this.props.maxLength) {
        this.setState({ value });
      }
    } else {
      this.setState({ value });
    }
  }

  handleDateChange = (date, dateString) => {
    this.setState({ value: dateString });
  }

  makeInput(dataType) {
    const { value } = this.state;
    switch (dataType.toLowerCase()) {

      case 'select':
        return (
          <Select
            optionFilterProp="children"
            style={this.props.style}
            showSearch
            value={value}
            onChange={this.handleChange}
          >
            {this.props.options && this.props.options.map((item, index) =>
              <Option key={index} value={item.value}>{item.title}</Option>,
            )}
          </Select>
        );

      case 'string':
        return (
          <Input
            style={this.props.style}
            value={value}
            onChange={this.handleChange}
            onPressEnter={this.props.onCheck}
          />
        );
      case 'number':
        return (
          <InputNumber
            value={value}
            style={this.props.style}
            onChange={this.handleChange}
            onPressEnter={this.props.onCheck}
            max={this.props.max}
            min={this.props.min}
          />
        );
      case 'datetime':
        return (
          <DatePicker
            showTime
            style={this.props.style}
            value={value ? moment(value, 'YYYY-MM-DD HH:mm:ss') : undefined}
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="选择时间"
            onChange={this.handleDateChange}
          />
        );

      case 'date':
        return (
          <DatePicker
            style={this.props.style}
            value={value ? moment(value, 'YYYY-MM-DD HH:mm:ss') : undefined}
            onChange={this.handleChange}
            format="YYYY-MM-DD"
          />
        );
      default :
        return (
          <div className="editable-row-text">
            {this.props.text || value || ' '}
          </div>
        );
    }
  }
  render() {
    const { value, editable } = this.state;
    const { dataType, text } = this.props;
    return (
      <div>
        {
          editable ?
            <div>
              {this.makeInput(dataType)}
            </div>
            :
            <div className="editable-row-text">
              {text || value || ' '}
            </div>
        }
      </div>
    );
  }

}
