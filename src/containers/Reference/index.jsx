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

import { SimpleReference } from '../../components/index';

import { REFER_DATA, TREEDATA } from "../../constant";

import './index.css';

const TreeNode = Tree.TreeNode;
const notification = Notification.newInstance({position: 'bottomRight'});



let array = [];
let treeData = TREEDATA.slice();
treeData.forEach(function (item, index){
    if(item.pid == ""){
        item.key = item.id;
        array.push(item);
    }
});
treeData = treeData.filter(function (item){
    return !item.key;
});
array.forEach(function (item) {
    lint(item);
})

function lint(obj){
    treeData.forEach(function (item, index){
        if(item.pid === obj.id){
            if(!obj.children){
                obj.children = [];
            }
            item.key = item.id;
            obj.children.push(item);
        }
    })
    treeData = treeData.filter(function (item){
        return !item.key;
    });
    if(treeData.length !== 0){
        if(obj.children){
            obj.children.forEach(function (item, index) {
                lint(item);
            })
        }
    }
}
// treeData.forEach(function (item, index){
//     if(!item.key){
//         array.forEach(function (item1, index1) {
//             if(item.pid == item1.id){
//                 if(!item1.children){
//                     item1.children = [];
//                 }
//                 item.key = `${index1}-${index}`
//                 item1.children.push(item);
//             }
//         })
//     }
// });

const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some(item => item.key === key)) {
                parentKey = node.key;
            } else if (getParentKey(key, node.children)) {
                parentKey = getParentKey(key, node.children);
            }
        }
    }
    return parentKey;
};


class Reference extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
            data: REFER_DATA["1001A11000000000SVW0"],
            commonData: [],
            selectValue: [],
            inputValue: [],
            activePage: 1,
            expandedKeys: [],
            treeSearchValue: '',
            tableSearchValue: '',
            autoExpandParent: true,
            tableSearchData: [],
        };
        this.commonColumns = [
            { title: '项目编码', dataIndex: 'refcode', key: 'refcode' },
            { title: '项目名称', dataIndex: 'refname', key: 'refname' },
            { title: '项目简称', dataIndex: 'pk_eps', key: 'pk_eps', render: this.changeHeight.bind(this)},
            {
                title: '操作', dataIndex: '', key: 'refpk', render: this.renderDelete.bind(this),
            },

        ];
        this.columns = [
            { title: '项目编码', dataIndex: 'refcode', key: 'refcode' },
            { title: '项目名称', dataIndex: 'refname', key: 'refname' },
            { title: '项目简称', dataIndex: 'pk_eps', key: 'pk_eps'},
            {
                title: '操作', dataIndex: '', key: 'refpk', render: this.renderAdd.bind(this),
            },
        ];
        this.renderAdd = this.renderAdd.bind(this);
        this.renderDelete = this.renderDelete.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.close = this.close.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onDataSelect = this.onDataSelect.bind(this);
        this.ensure = this.ensure.bind(this);
        this.deleteSelect = this.deleteSelect.bind(this);
        this.empty = this.empty.bind(this);
        this.handlePageSelect = this.handlePageSelect.bind(this);
        this.handleTreeSearch = this.handleTreeSearch.bind(this);
        this.handleTableSearch = this.handleTableSearch.bind(this);

    }
    changeHeight (text, record, index) {
        return <div style={{ height: 50, lineHeight: 50 }}>{text}</div>
    }
    renderAdd (text, record, index) {
        return <span style={{ cursor: 'pointer' }} onClick={this.handleAdd(record)}><Icon type="uf-plus" />添加到常用</span>;
    }
    renderDelete (text, record, index) {
        return <Popconfirm content="确认删除?" onClick={e=>e.stopPropagation()} onClose={this.handleDelete(index)}>
            <span>
            <Icon type="uf-del" />
            删除
            </span>
        </Popconfirm>;
    }
    onSelect(selectedKeys, info) {
        if(REFER_DATA[selectedKeys[0]]){
            this.setState({
                data: REFER_DATA[selectedKeys[0]]
            });
        }
    }
    onDataSelect (record, index) {
        let array = this.state.selectValue;
        array.push(record.refname);
        this.setState({
            selectValue: array
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
    empty () {
        this.setState({
            selectValue: []
        })
    }
    ensure () {
        this.setState({
            inputValue: this.state.selectValue,
            show: false
        })
    }
    deleteSelect (index){
        const self = this;
        return function () {
            let array = self.state.selectValue;
            array.splice(index, 1);
            self.setState({
                selectValue: array
            })
        }
    }
    handlePageSelect(eventKey) {
        this.setState({
            activePage: eventKey
        });
    }
    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }
    handleTreeSearch(e) {
        const value = e.target.value;
        const expandedKeys = treedata.map((item) => {
            if (item.name.indexOf(value) > -1) {
                return getParentKey(item.key, array);
            }
            return null;
        }).filter((item, i, self) => item && self.indexOf(item) === i);
        this.setState({
            expandedKeys,
            treeSearchValue: value,
            autoExpandParent: true,
        });
    }
    handleTableSearch(e){
        const value = e.target.value;
        let data = this.state.data;
        let searchData = [];
        data = data.forEach(function (item, index) {
            if(item.refname.indexOf(value) > -1){
                searchData.push(item);
            }
        });
        this.setState({
            tableSearchValue: value,
            tableSearchData: searchData
        });
    }
    render () {
        const { data, commonData, treeSearchValue } = this.state;
        const self = this;
        data.forEach(function (item, index) {
            item.key = index;
        });
        commonData.forEach(function (item, index) {
            item.key = index;
        });
        const loop = data => data.map((item) => {
            const index = item.name.search(treeSearchValue);
            const beforeStr = item.name.substr(0, index);
            const afterStr = item.name.substr(index + treeSearchValue.length);
            const title = index > -1 ? (
                <span>
                 {beforeStr}
                    <span style={{ color: '#f50' }}>{treeSearchValue}</span>
                    {afterStr}
               </span>
            ) : <span>{item.name}</span>;
            if (item.children) {
                return (
                    <TreeNode key={item.id} title={<span><Icon type="uf-treefolder" />{title}</span>}>
                        {loop(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.id} title={<span><Icon type="uf-box-o-2" />{title}</span>} />;
        });
        return (
            <Row>
                <Col md={10} mdOffset={1}>
                    <FormGroup>
                        <Label>参照例子</Label>
                        <FormControl
                            value={this.state.inputValue.map(function (item, index) {
                                return item;
                            })}
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
                                    columns={this.commonColumns}
                                    data={commonData}
                                />
                            </TabPane>

                            <TabPane tab="参照" key="2">
                                <div>
                                    <Col md={3}>
                                        <div style={{ height: 500, overflow: 'auto' }}>
                                            <InputGroup simple style={{left: 20, top: 5 }}>
                                                <FormControl type="text" onChange={ this.handleTreeSearch }/>
                                                <InputGroup.Button>
                                                    <Icon type="uf-search" />
                                                </InputGroup.Button>
                                            </InputGroup>
                                            <Tree
                                                onSelect={this.onSelect}
                                                onExpand={this.onExpand}
                                                expandedKeys={this.state.expandedKeys}
                                                autoExpandParent={this.state.autoExpandParent}
                                            >
                                                {loop(array)}
                                            </Tree>
                                        </div>

                                    </Col>
                                    <Col md={8}>
                                        <Row>
                                            <Col md={12}>
                                                <InputGroup simple style={{ float: 'right', margin: 5 }}>
                                                    <FormControl type="text" onChange={this.handleTableSearch} />
                                                    <InputGroup.Button>
                                                        <Icon type="uf-search" />
                                                    </InputGroup.Button>
                                                </InputGroup>
                                            </Col>
                                            <Col md={12}>
                                                <Table
                                                    rowClassName = { this.setClassName }
                                                    onRowClick = { this.onDataSelect }
                                                    columns={this.columns}
                                                    data={this.state.tableSearchValue === '' ? data : this.state.tableSearchData }
                                                />
                                            </Col>
                                        </Row>
                                        <Pagination
                                            style={{ float: 'right'}}
                                            prev
                                            next
                                            boundaryLinks
                                            items={20}
                                            maxButtons={5}
                                            activePage={this.state.activePage}
                                            onSelect={this.handlePageSelect.bind(this)} />
                                    </Col>
                                </div>
                            </TabPane>
                        </Tabs>

                    </Modal.Body>
                    <Modal.Footer>
                        <div style={{ textAlign: 'left'}}>
                            <span style={{ padding: "5px 10px" }}>已选数据:</span>
                            <span>{
                                this.state.selectValue.map(function (item, index) {
                                    return (<span key={index} style={{ display: 'inline-block',padding: "2px 2px 2px 10px", background: '#f5f5f5', border: "1px solid gray", borderRadius: '5px', margin: '0 5px' }}>{item}<Icon style={{ marginLeft: 5, fontSize: 14, color: "gray", cursor: 'pointer'}} type="uf-close" onClick={self.deleteSelect(index)}></Icon></span>)
                                })}</span>
                        </div>
                        <div>
                            <Button onClick={ this.empty }> 清空 </Button>
                            <Button onClick={ this.ensure } colors="primary" style={{ margin: "0 30px" }}> 确认 </Button>
                            <Button onClick={ this.close }> 关闭 </Button>
                        </div>

                    </Modal.Footer>
                </Modal>
                <Col md={12}>
                    <SimpleReference />
                </Col>
            </Row>
        )
    }
}


export default Reference;