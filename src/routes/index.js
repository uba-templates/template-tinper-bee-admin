import { Router, Route, browserHistory, IndexRoute,hashHistory } from 'react-router';
import { App, Dashbroad, UserManager, Reference, DataTable, MyEditor } from '../containers';

import React from 'react';

export default (
  <Router history={ hashHistory }>
      <Route path="/" component={ App } >
          <IndexRoute component={ Dashbroad }/>
          <Route path="/usermanager" component={ UserManager } />
          <Route path="/reference" component={ Reference } />
          <Route path="/datatable" component={ DataTable } />
          <Route path="/editor" component={ MyEditor } />
      </Route>
  </Router>
)
