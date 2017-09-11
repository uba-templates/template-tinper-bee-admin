import React, {Component} from 'react';
import {MyComponent} from '../../components';
import {Route} from 'mirrorx'
import Dashbroad from '../Dashbroad/index';
import UserManager from '../UserManager';
import Reference from '../Reference';
import DataTable from '../DataTable';
import MyEditor from '../Editor';
import {MyHeader} from 'components';
import {Menus} from 'components';
import {Con, Row, Col, Icon} from 'tinper-bee';
import classnames from 'classnames';

import './index.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false
        }
    }

    handleToggle = () => {
        this.setState({
            toggle: !this.state.toggle
        })
    }

    render() {
        const { toggle } = this.state;
        return (
            <div style={{ height: '100%' }}>
                <div className={classnames("side-bar",{"toggled": toggle})}>
                    {
                        toggle ? (
                            <Icon type="uf-iuap-col" className="nav-icon" />
                        ) : (
                            <img
                                src="//design.yonyoucloud.com/static/img/designer/logo.png"
                            />
                        )
                    }

                    <Menus toggle={ toggle } />
                </div>
                <div className={classnames("content",{"toggled": toggle})}>
                    <MyHeader toggle={ toggle } onToggle={ this.handleToggle } />
                    <Con fluid={true}>
                        <Route exact path="/" component={ Dashbroad }/>
                        <Route path="/usermanager" component={ UserManager } />
                        <Route path="/reference" component={ Reference } />
                        <Route path="/datatable" component={ DataTable } />
                        <Route path="/editor" component={ MyEditor } />
                    </Con>

                </div>
            </div>
        );
    }
}

export default App;
