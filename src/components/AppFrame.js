import React from 'react';

import Header from './Header';

export default class AppFrame extends React.Component {
    render() {
        return (
                <div>
                    <Header/>
                    { this.props.children }
                </div>
        )
    }
};
