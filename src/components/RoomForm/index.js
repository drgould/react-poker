import React from 'react';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';
import _cloneDeep from 'lodash/cloneDeep';

import db from '../../services/db';

export default class RoomForm extends React.Component {
    constructor( props ) {
        super();
        this.state = {
            room : _cloneDeep( props.room ),
        };
    }

    handleRoomInputChange( prop, value ) {
        switch( prop ) {
            case 'name' : {
                this.state.room.name = value;
                this.state.room.url = value.replace( / /ig, '_' );
                break;
            }
        }
        this.setState( { room : this.state.room } );
    }

    isFormValid() {
        return (
            this.state.room.name
        );
    }

    saveRoom( ev ) {
        ev.preventDefault();
        const data = this.state.room;
        const action = data.key ? 'update' : 'push';
        const path = `rooms/${ data.key || '' }`;
        db[ action ]( path, { data } )
            .then( ( room ) => this.props.onSave( this.state.room ) );
    }

    render() {
        return (
            <form onSubmit={this.saveRoom.bind(this)}>
                <Input
                    name="name"
                    label="Room Name"
                    required
                    value={this.state.room.name}
                    onChange={this.handleRoomInputChange.bind( this, 'name' )}/>

                <Button
                    type="submit"
                    label={this.state.room.key ? 'Save' : 'Create'}
                    disabled={!this.isFormValid()}/>
            </form>
        )
    }
}
