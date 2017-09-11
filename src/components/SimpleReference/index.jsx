import React, { Component } from 'react';
import {
    Row,
    Col,
    FormControl,
    Modal,
    Label,
    Tree,
    Table,
    FormGroup,
    Icon,
    Button,
    Popconfirm,
    Pagination,
    InputGroup,
    Notification
} from 'tinper-bee';


import Tabs, { TabPane } from 'bee-tabs';
import TabContent from 'bee-tabs/build/TabContent';
import ScrollableInkTabBar from 'bee-tabs/build/ScrollableInkTabBar';

import { SIMPLE_REFER_DATA } from '../../constant';

import './index.css';

const notification = Notification.newInstance({position: 'bottomRight'});

class SimpleReference extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
            data: SIMPLE_REFER_DATA,
            commonData: [],
            selectValue: "",
            inputValue: ""
        };
        this.commonColumns = [
            { title: '银行账号', dataIndex: 'id', key: 'id'},
            {  title: '银行户名', dataIndex: 'refname', key: 'refname'},
            { title: '账号编码', dataIndex: 'refpk', key: 'refpk'},
            {
                title: '操作', dataIndex: '', key: 'd', render: this.renderAdd.bind(this),
            },
        ];
        this.columns = [
            { title: '银行账号', dataIndex: 'id', key: 'id'},
            {  title: '银行户名', dataIndex: 'refname', key: 'refname'},
            { title: '账号编码', dataIndex: 'refpk', key: 'refpk'},
            {
                title: '操作', dataIndex: '', key: 'd', render: this.renderDelete.bind(this),
            },
        ];
        this.renderAdd = this.renderAdd.bind(this);
        this.renderDelete = this.renderDelete.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.close = this.close.bind(this);
        this.onDataSelect = this.onDataSelect.bind(this);
        this.ensure = this.ensure.bind(this);
    }
    renderAdd (text, record, index) {
        return <span style={{ cursor: 'pointer' }} onClick={this.handleAdd(record)}><Icon type="uf-plus"></Icon>添加到常用</span>;
    }
    renderDelete (text, record, index) {
        return <Popconfirm content="确认删除?" onClick={e=>e.stopPropagation()} onClose={this.handleDelete(index)}>
            <span>
            <Icon type="uf-del"></Icon>
            删除
            </span>
        </Popconfirm>;
    }
    onDataSelect (record, index) {
        this.setState({
            selectValue: record.refname
        })
    }
    handleAdd (record) {
        const self = this;
        return function (e) {
            let data = self.state.commonData;
            data.push(record);
            self.setState({
                commonData: data
            });
            e.stopPropagation();
            notification.notice({
                content: <span>添加成功</span>,
                color: 'light'
            });
        }
    }
    handleDelete (index) {
        const self = this;
        return function () {
            let data = self.state.commonData;
            data.splice(index, 1);
            self.setState({
                commonData: data
            });
        }
    }
    handleFocus () {
        this.setState({
            show: true
        })
    }
    close () {
        this.setState({
            show: false
        })
    }
    ensure () {
        this.setState({
            inputValue: this.state.selectValue,
            show: false
        })
    }
    render () {
        const { data, commonData } = this.state;
        data.forEach(function (item, index) {
            item.key = index;
        });
        commonData.forEach(function (item, index) {
            item.key = index;
        });
        return (
            <Row>
                <Col md={10} mdOffset={1}>
                    <FormGroup>
                        <Label>简单参照例子</Label>
                        <FormControl
                            value={this.state.inputValue}
                            onClick={this.handleFocus}
                        />
                    </FormGroup>
                </Col>
                <Modal show={ this.state.show } size='xlg' onHide={ this.close }>
                    <Modal.Header closeButton>
                        <Modal.Title > 我来组成头部 </Modal.Title>
                    </Modal.Header >
                    <Modal.Body >
                        <Tabs
                            defaultActiveKey="2"
                            renderTabBar={()=><ScrollableInkTabBar />}
                            renderTabContent={()=><TabContent />}
                        >
                            <TabPane tab="常用" key="1">
                                <Table
                                    onRowClick = { this.onDataSelect }
                                    columns={this.columns}
                                    data={commonData}
                                />
                            </TabPane>

                            <TabPane tab="参照" key="2">
                                <div>
                                    <Table
                                        onRowClick = { this.onDataSelect }
                                        columns={this.commonColumns}
                                        data={data}
                                    />
                                </div>
                            </TabPane>
                        </Tabs>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={ this.ensure } colors="primary" style={{ marginRight: 50 }}> 确认 </Button>
                        <Button onClick={ this.close }> 关闭 </Button>
                    </Modal.Footer>
                </Modal>
            </Row>
        )
    }
}

export default SimpleReference;