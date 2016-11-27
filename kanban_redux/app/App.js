import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import KanbanBoardContainer from './components/KanbanBoardContainer';
import { browserHistory } from 'react-router';
import { Router, Route, Link, IndexRoute } from 'react-router'
import { Provider } from 'react-redux';
import KanbanBoard from './components/KanbanBoard';
import EditCard from './components/EditCard';
import NewCard from './components/NewCard';
import KanbanStore from './stores/KanbanStore';

ReactDOM.render((
  <Provider store={ KanbanStore }>
    <Router history={ browserHistory }>
      <Route component={ KanbanBoardContainer }>
        <Route path='/' component={ KanbanBoard }>
          <Route path='new' component={ NewCard } />
          <Route path='edit/:card_id' component={ EditCard } />
        </Route>
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
