import React from 'react';

import './styles.less';

export default ( props ) => (
    <div className="column col-4">
        <div className="card card--room-card">
            <div className="card-image card-image--cover">
                <img src="http://lorempixel.com/500/500/nature" className="img-responsive img-fit-cover"/>
            </div>
            <div className="card-header">
                <h4 className="card-title">{ props.room ? props.room.name : 'Create a Room' }</h4>
            </div>
        </div>
    </div>
);
