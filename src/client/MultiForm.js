import React, { Component } from 'react';
import { Form, Icon, Button } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createForm, formShape, createFormField } from 'rc-form';
import * as CounterActions from '../actions';
import MiniForm from './Form';
// จงประยุก Form_ ให้เข้ากับ Redux form
// import MiniForm from './Form_';

const FormItem = Form.Item;
class DynamicFieldSet extends Component {

  static propTypes = {
    form: formShape,
  }

  handleSubmit = (e) => {    
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
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
    return (
      <Form onSubmit={this.handleSubmit}>
        { forms.map(
          (item, index) => <MiniForm key={index} index={item.key} formItemLayout={formItemLayout} formItemLayoutWithOutLabel={formItemLayoutWithOutLabel}/>
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
    return {
      multiForm: createFormField(props.multiForm)
    };
  },
})(DynamicFieldSet));