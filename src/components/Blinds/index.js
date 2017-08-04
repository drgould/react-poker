import React from 'react';

import styles from './styles.css';

import { Card, CardTitle, CardActions } from 'react-toolbox/lib/card';
import List from 'react-toolbox/lib/list/List';
import ListItem from 'react-toolbox/lib/list/ListItem';

import { blindLevel } from '../../services/timer';

class Blinds extends React.Component {
    constructor() {
        super();
        this.state = { activeIndex: 0 };
    }

    componentWillMount() {
        window.addEventListener( 'blinds-up', this.raiseBlinds, false );
    }

    componentWillUnmount() {
        window.removeEventListener( 'blinds-up', this.raiseBlinds, false );
    }

    raiseBlinds() {
        if ( this.state.activeIndex + 1 > this.props.smallBlinds.length - 1 ) { return; }
        this.setState( { activeIndex: this.state.activeIndex + 1 } );
    }

    lowerBlinds() {
        if ( this.state.activeIndex === 0 ) { return; }
        this.setState( { activeIndex: this.state.activeIndex - 1 } );
    }

    render() {
        return (
            <Card>
                <CardTitle title="Blinds"/>
                <List>
                    { this.props.smallBlinds.map( ( blind, index ) => {
                        return (
                            <ListItem
                                caption={ `${ blind } / ${ blind * 2 }` }
                                className={ blindLevel( this.props.game ) === index ? styles.active : '' }/>
                        );
                    } ) }
                </List>
                <CardActions>
                    <Button onClick={ this.raiseBlinds.bind( this ) } label="Raise" />
                    <Button onClick={ this.lowerBlinds.bind( this ) } label="Lower"/>
                </CardActions>
            </Card>
        );
    }
}

export default Blinds;
