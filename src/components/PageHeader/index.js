import React from 'react';
import { Link } from 'react-router';

import Clock from '../Clock';
import { authState } from '../../services/auth';

import './styles.less';

export default () => {
    window.addEventListener( 'auth-change', () => this.setState( this.state ) );
    const avatar = authState.user ?
        <figure className="avatar">
            <img src={ authState.user.photoURL } alt={ authState.user.displayName }/>
        </figure> :
        '';
    return (
        <div className="container container--navbar">
            <div className="columns">
                <div className="column">
                    <header className="navbar">
                        <section className="navbar-section">
                            <Link to="/" className="navbar-brand mr-10">Hold-em Helper</Link>
                        </section>
                        <section className="navbar-section">
                            { avatar }
                            <Clock/>
                        </section>
                    </header>
                </div>
            </div>
        </div>
    );
}
