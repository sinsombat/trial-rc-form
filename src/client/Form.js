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

  render() {

    const { getFieldDecorator } = this.props.form;
    const { index, formItemLayout, formItemLayoutWithOutLabel } = this.props
    const { forms } = this.props.multiForm
    
    return (
      <FormItem
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? 'Passengers' : ''}
        required={false}
      >
      {getFieldDecorator(`item_${index}`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: "Please input passenger's name or delete this field.",
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
    const item = props.multiForm.forms.find(index => index.key === props.index)
    return {
      [`item_${props.index}`] : createFormField(item)
    };
  },
  onFieldsChange(props, fields) {
    const { key, value } = fields[`item_${props.index}`]
    props.updateForm(key, value)
  },
})(formItems));