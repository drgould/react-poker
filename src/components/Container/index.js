import React from 'react';

import './styles.less';

export default ( props ) => (
    <div className="container grid-1280">
        <div className="columns">
            { props.children }
        </div>
    </div>
);
