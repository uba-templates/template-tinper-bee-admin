import React ,{Component } from 'react';
import ReactDOM from 'react-dom';
import {Form, FormControl,FormGroup ,Row ,Col} from 'tinper-bee';
const FormItem=Form.FormItem;

import './index.css';

class BasicInfo extends Component {
    constructor(props){
      super(props);
    }
    checkForm = (flag,obj) => {
        console.log(flag);
        console.log(obj);
    }
    componentDidMount() {
      // 给label设定样式
      let labels = document.getElementsByTagName("label");
      for(let i=0;i<labels.length;i++){
        labels[i].className += " labelTag";
      }
    }
    render() {
        return (
            <div>
            <h4 className="userInfoTit">基础信息</h4>
            <Form userRow={true} submitCallBack={this.checkForm}>
               <FormItem inline={true} md={4} labelName="姓名*"  isRequire={true} htmlType="chinese" errorMessage="姓名格式错误" method="blur"  >
                   <FormControl  name="name" placeholder="只能输入中文"/>
               </FormItem>
               <FormItem inline={true} md={4} labelName="性别*" isRequire={true} method="blur" errorMessage="性别格式错误" reg={/^['男'|'女']$/}  >
                   <FormControl  name="age" placeholder="男/女"/>
               </FormItem>
               <FormItem inline={true} md={4} labelName="邮箱*" isRequire={true} method="blur" htmlType="email" errorMessage="邮箱格式错误" >
                   <FormControl  name="age" placeholder="请输入邮箱"/>
               </FormItem>  
               <FormItem inline={true} md={4} labelName="手机"  isRequire={true} method="blur" htmlType="tel" errorMessage="手机格式错误"  >
                   <FormControl  name="age" placeholder="请输入手机号"/>
               </FormItem>
               <FormItem inline={true} md={4} labelName="证件类型" method="blur" errorMessage="证件类型格式错误" >
                   <FormControl  name="age" placeholder="身份证"/>
               </FormItem>
               <FormItem inline={true} md={4} labelName="证件号码" isRequire={true} method="blur" htmlType="IDCard" errorMessage="证件号码格式错误" >
                   <FormControl  name="age" placeholder="请输入身份证号"/>
               </FormItem>
               <FormItem inline={true} md={4} labelName="所属组织" method="blur" errorMessage="格式错误"  >
                   <FormControl  name="age" />
               </FormItem>
               <FormItem inline={true} md={4} labelName="用户编码*" method="blur" errorMessage="用户编码格式错误"  >
                   <FormControl  name="age" placeholder="请输入用户编码"/>
               </FormItem>
               <FormItem inline={true} md={4} labelName="入职日期" isRequire={true} method="blur" errorMessage="日期格式错误" reg={/(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)/}  >
                   <FormControl  name="age" placeholder="YYYY-MM-DD"/>
               </FormItem>
               <FormItem inline={true} md={4} labelName="用户类别" method="blur" errorMessage="用户类别格式错误"  >
                   <FormControl  name="age" />
               </FormItem>
               <FormItem inline={true} md={4} labelName="用户状态" method="blur" errorMessage="用户状态格式错误" >
                   <FormControl  name="age" />
               </FormItem>
               <FormItem inline={true} md={4} labelName="登陆账号*  " isRequire={true} method="blur" htmlType="email" errorMessage="登陆账号格式错误" >
                   <FormControl  name="age" placeholder="邮箱账号"/>
               </FormItem>
               <FormItem inline={true} md={4} labelName="出生日期" isRequire={true} method="blur" errorMessage="日期格式错误" reg={/(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)/}  >
                   <FormControl  name="age" placeholder="YYYY-MM-DD"/>
               </FormItem>
            </Form>
            </div>
        )
    }
}

export default BasicInfo;