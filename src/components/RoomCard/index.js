import React from 'react';
import { browserHistory } from 'react-router';

import ROUTES from '../../services/routes';

import './styles.less';

export default ( props ) => (
    <div className="column col-4">
        <div className="card card--room-card" onClick={ () => browserHistory.push( ROUTES.ROOM.getUrl( props.room ) ) }>
            <div className="card-image card-image--cover">
                <img src="http://lorempixel.com/500/500/nature" className="img-responsive img-fit-cover"/>
            </div>
            <div className="card-header">
                <h4 className="card-title">{ props.room.name }</h4>
            </div>
        </div>
    </div>
);
