import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import KanbanBoardContainer from './components/KanbanBoardContainer';
import { browserHistory } from 'react-router';
import { Router, Route, Link, IndexRoute } from 'react-router';
import KanbanBoard from './components/KanbanBoard';
import EditCard from './components/EditCard';
import NewCard from './components/NewCard';

ReactDOM.render((
  <Router history={ browserHistory }>
    <Route component={ KanbanBoardContainer }>
      <Route path='/' component={ KanbanBoard }>
        <Route path='new' component={ NewCard } />
        <Route path='edit/:card_id' component={ EditCard } />
      </Route>
    </Route>
  </Router>
), document.getElementById('root'))
