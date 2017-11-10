import React, { Component } from 'react';
import {
    Row,
    Col,
    Panel,
    Table,
    Select,
} from 'tinper-bee';
import { EditableCell, LoadingTable ,AppointmentList ,BasicInfo } from '../../components/index';

import './index.css';

class UserInfo extends Component{
    constructor(props){
        super(props);
    }

    render () {
        return (
            <Row className="data-table">
                <Col md={12}>
                    <BasicInfo />
                </Col>
                <Col md={12}>
                    <AppointmentList/>
                </Col>
            </Row>
        )
    }
}

export default UserInfo;