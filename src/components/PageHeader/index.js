import React from 'react';
import { Link } from 'react-router';

import Clock from '../Clock';
import { authState, signIn, signOut } from '../../services/auth';

import './styles.less';

export default class PageHeader extends React.Component {
    constructor() {
        super();
        this._forceUpdate = () => this.forceUpdate();
    }

    componentDidMount() {
        window.addEventListener( 'auth-state-change', this._forceUpdate, false );
    }

    componentWillUnmount() {
        window.removeEventListener( 'auth-state-change', this._forceUpdate, false );
    }

    render() {
        const avatar = authState.user ?
            (
                <div>
                    <a onClick={ () => signOut() } className="btn btn-link">Log Out</a>
                    <figure className="avatar">
                        <img src={ authState.user.photoURL } alt={ authState.user.displayName }/>
                    </figure>
                </div>
            ) :
            (
                <a className="btn btn-link" onClick={ () => signIn() }>Log In</a>
            );
        return (
            <div className="container container--navbar">
                <div className="columns">
                    <div className="column">
                        <header className="navbar">
                            <section className="navbar-section">
                                <Link to="/" className="btn btn-link btn-action">
                                    <i className="icon icon-home"></i>
                                </Link>
                                <span className="navbar-brand">Hold-em Helper</span>
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
}
