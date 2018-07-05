import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createForm, formShape, createFormField } from 'rc-form';
import * as CounterActions from '../actions';
// จงประยุก Form_ ให้เข้ากับ Redux
// import MiniForm from './Form_';

const FormItem = Form.Item;
class DynamicFieldSet extends Component {

  static propTypes = {
    form: formShape,
  }

  handleSubmit = (e) => {    
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  checkUpper = (rule, value, callback) => {
    if (value !== value.toUpperCase()) {
      callback(new Error('need to be upper!'));
    } else {
      callback();
    }
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { forms } = this.props.multiForm
    
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    getFieldDecorator("keys", { initialValue: forms });
    const keys = getFieldValue("keys");
    return (
      <Form onSubmit={this.handleSubmit}>
        { keys.map(
          (item, index) => 
          <FormItem
            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
            label={index === 0 ? 'Passengers' : ''}
            required={false}
            key={index}
          >
          {getFieldDecorator(`forms[${index}]`, {
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
                onClick={() => this.props.removeForm(item.name)}
              />
            ) : null}
          </FormItem>
        ) }
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.props.addForm} style={{ width: '60%' }}>
            <Icon type="plus" /> Add field
          </Button>
        </FormItem>
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>
      </Form>
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
    const forms = {}
    for (const key in props.multiForm.forms) {
      if (props.multiForm.forms.hasOwnProperty(key)) {
        const item = props.multiForm.forms[key];
        forms[`forms[${key}]`] = createFormField(item)
      }
    }
    return {
      multiForm: createFormField(props.multiForm),
      ...forms
    };
  },
  onFieldsChange(props, fields) {
    if(fields.forms) {
      const firstKey = Object.keys(fields.forms)[0];
      const object = fields.forms[firstKey];
      props.updateForm(firstKey, object)
    }
  },
})(DynamicFieldSet));