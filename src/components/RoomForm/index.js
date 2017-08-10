import React from 'react';
import _cloneDeep from 'lodash/cloneDeep';

import db from '../../services/db';
import { defaultRoom } from '../../services/variables';

import styles from './styles.less';

export default class RoomForm extends React.Component {
    constructor( props ) {
        super();
        const room = props.room || defaultRoom;
        this.oldKey = room.key;
        this.state = {
            room : _cloneDeep( room ),
            saving : false,
            isFormValid : false,
            isFieldValid : {
                name : {
                    valid : true,
                    message : '',
                },
            },
        };
    }

    componentDidMount() {
        this.validateForm( true );
    }

    handleRoomInputChange( { target : { name, value } } ) {
        switch( name ) {
            case 'name' : {
                this.state.room.name = value;
                this.state.room.key = value.replace( / /ig, '_' );
                break;
            }
        }
        this.setState( { room : this.state.room } );
        this.validateForm();
    }

    validateForm( pristine ) {
        const room = this.state.room;

        function validate( resolve, reject ) {
            const isFieldValid = {
                name : {
                    valid : false,
                    message : '',
                },
            };
            if( room.name && room.name.length >= 3 ) {
                    isFieldValid.name.valid = true;
            } else if( room.name ) {
                isFieldValid.name.message = 'Name must be 3 or more letters';
            } else if( !pristine ) {
                isFieldValid.name.message = 'Please enter a name';
            }
            const isFormValid = isFieldValid.reduce( ( valid, field ) => ( valid && field.valid ), true );
            this.setState( { isFormValid, isFieldValid } );
            if( isFormValid ) {
                resolve();
            } else {
                reject();
            }
        }

        return new Promise( ( resolve, reject ) => {
            if( room.key !== this.oldKey ) {
                db.fetch( `/rooms/${ room.key }` )
                    .then( () => {
                        this.setState( { isFormValid : false } );
                        reject();
                    } )
                    .catch( () => validate( resolve, reject ) );
            } else {
                validate( resolve, reject );
            }
        } );
    }

    saveRoom( ev ) {
        ev.preventDefault();
        if( !this.state.saving ) {
            const data = _cloneDeep( this.state.room );
            this.setState( { saving : true } );
            this.validateForm()
                .then( () => {
                    return db.post( `rooms/${ data.key }`, { data } );
                } )
                .then( () => {
                    this.props.onSave( this.state.room );
                    this.setState( { saving : false } );
                } );
        }
    }

    render() {
        return (
            <div className="container">
                <div className="columns">
                    <div className="column col-6 col-md-12 centered">
                        <form onSubmit={this.saveRoom.bind(this)}>
                            <div className="form-group">
                                <input
                                    id="room-name"
                                    className="form-input"
                                    name="name"
                                    type="text"
                                    placeholder="Room Name"
                                    required
                                    value={this.state.room.name}
                                    onChange={this.handleRoomInputChange.bind( this )}/>
                            </div>
                            <div className="form-group">
                                <button
                                    type="submit"
                                    className={ `btn centered ${ this.state.saving ? 'loading' : 'btn-primary' }` }
                                    disabled={ !this.state.isFormValid || this.state.saving }>
                                    Create Room
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
