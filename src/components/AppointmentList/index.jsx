import React, { Component } from 'react';
import { 
    Row,
    Col,
    ButtonGroup ,
    Button,
    Icon,
    Panel,
    Select,
    Table, 
    Pagination } from 'tinper-bee';
import { getUserData } from '../../serve/index.js';

import './index.css';

class AppointmentList extends Component{
    constructor(props){
        super(props);
        this.columns = [
          { title: "所属组织", dataIndex: "organization", key: "organization", width: 180 },
          { title: "所属部门", dataIndex: "department", key: "department", width: 200 },
          { title: "启用状态", dataIndex: "state", key: "state", width: 130 },
          { title: "第四列", dataIndex: "Fourth", key: "Fourth", width: 100 },
          { title: "第五列", dataIndex: "Fifth", key: "Fifth", width: 100 },
          {
            title: "第六列",
            dataIndex: "Sixth",
            key: "Sixth",
            render(text, record, index) {
              return (
                <a
                  href="#"
                  onClick={() => {
                    alert('这是第'+index+'列，重新提交');
                  }}
                >
                  Resubmit
                </a>
              );
            }
          }
        ];
        this.state = {
            data : [
              { organization: "Alexander", department: "yahoo", state: 9, Fourth: "Approved",Fifth:"09/15/2016", key: "1" },
              { organization: "Tom Jenkins", department: "hotmail", state: 15, Fourth: "Denied",Fifth:"11/06/2016", key: "2" },
              { organization: "Floyd Shaw", department: "hotmail", state: 26, Fourth: "Denied",Fifth:"06/27/2016", key: "3" }
            ],
            showLoading: true,
            activePage:1,
            totalPage:5
        }
    }

    render(){
        return(
            <div className="modal-container">
                <div className="header">
                  <span className="userInfoTit">任职列表</span>
                  <ButtonGroup style={{ margin: 10 }} id="btnGroup">
                      <Button shape='border' className="firstBtn"><Icon type='uf-star-o' /></Button>
                      <Button shape='border'><Icon type='uf-file-o-2' /></Button>
                      <Button shape='border'><Icon type='uf-del' /></Button>
                      <Button shape='border' className="lastBtn"><Icon type='uf-back' /></Button>
                  </ButtonGroup>
                  <ButtonGroup style={{ margin: 10 }} id="btnGroup2">
                      <Button colors="primary" size="sm"><Icon type='uf-symlist' /></Button>
                      <Button colors="primary" size="sm"><Icon type='uf-folder-o' /></Button>
                      <Button colors="primary" size="sm"><Icon type='uf-pencil' /></Button>
                      <Button colors="primary" size="sm"><Icon type='uf-del' /></Button>
                  </ButtonGroup>
                </div>
                <Table
                    columns={ this.columns }
                    data={ this.state.data }
                    className={`AppointTable`}
                />
            </div>

        )
    }
}

export default AppointmentList;
