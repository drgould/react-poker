import React from 'react';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';
import _cloneDeep from 'lodash/cloneDeep';

import db from '../services/db';

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
                break;
            }
            case 'venmo.username' : {
                this.state.room.venmo.username = value;
                break;
            }
            case 'venmo.password' : {
                this.state.room.venmo.password = value;
                break;
            }
        }
        this.setState( { room : this.state.room } );
    }

    isFormValid() {
        return (
            this.state.room.name
            && this.state.room.venmo.username
            && this.state.room.venmo.password
        );
    }

    saveRoom( ev ) {
        ev.preventDefault();
        const data = this.state.room;
        const action = this.state.room.key ? 'update' : 'push';
        const path = `rooms/${this.state.room.key || ''}`;
        db[ action ]( path, { data } )
            .then( ( room ) => this.props.onSave( this.state.room ) );
    }

    render() {
        return (
            <form>
                <Input
                    name="name"
                    label="Room Name"
                    required
                    value={this.state.room.name}
                    onChange={this.handleRoomInputChange.bind( this, 'name' )}/>

                <h4>Venmo Holding Account Details</h4>
                <Input
                    name="venmo.username"
                    label="Email or Phone Number"
                    icon="email"
                    required
                    value={this.state.room.venmo.username}
                    onChange={this.handleRoomInputChange.bind( this, 'venmo.username' )}/>
                <Input
                    type="password"
                    name="venmo_password"
                    label="Password"
                    icon="lock_outline"
                    required
                    value={this.state.room.venmo.password}
                    onChange={this.handleRoomInputChange.bind( this, 'venmo.password' )}/>

                <Button
                    label={this.state.room.key ? 'Save' : 'Create'}
                    disabled={!this.isFormValid()}
                    onClick={this.saveRoom.bind( this )}/>
            </form>
        )
    }
}
