import React from "react";
import { Form, Input, Icon } from 'antd';
import { createForm, formShape, createFormField } from 'rc-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CounterActions from '../actions';
const FormItem = Form.Item;
class formItems extends React.Component {

  static propTypes = {
    form: formShape,
  }

  checkUpper = (rule, value, callback) => {
    if (value !== value.toUpperCase()) {
      callback(new Error('need to be upper!'));
    } else {
      callback();
    }
  }

  render() {

    const { getFieldDecorator } = this.props.form;
    const { index, index_arr, formItemLayout, formItemLayoutWithOutLabel } = this.props
    const { forms } = this.props.multiForm
    
    return (
      <FormItem
        {...(index_arr === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index_arr === 0 ? 'Passengers' : ''}
        required={false}
      >
      {getFieldDecorator(`${index}`, {
            validateTrigger: ['onChange'],
            rules: [{
              required: true,
              whitespace: true,
              message: "Please input passenger's name or delete this field.",
              // validator: this.checkUpper
            }],
          })( <Input placeholder="passenger name" style={{ width: '60%', marginRight: 8 }} /> )}
        
        {forms.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={forms.length === 1}
            onClick={() => this.props.removeForm(index)}
          />
        ) : null}
      </FormItem>
    );
  }
}

const mapStateToProps = state => {
  return {
    multiForm: state.multiForm
  }
} 

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(CounterActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(createForm({
  mapPropsToFields(props) {
    console.log(props);
    const item = props.multiForm.forms.find(item => item.name === props.index)
    return {
      [props.index] : createFormField(item)
    };
  },
  onFieldsChange(props, fields) {
    console.log(fields);
    
    const firstKey = Object.keys(fields)[0];
    const object = fields[firstKey];
    props.updateForm(object)
  },
})(formItems));