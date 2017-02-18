import React from 'react';
import Header from './Header';

export default class AppFrame extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <div className="md-toolbar-relative">
                    { this.props.children }
                </div>
            </div>
        )
    }
};
