import React from 'react';

import  './styles.less';

import { getCurrentBlind } from '../../services/timer';

export default ( props ) => {
    console.log( 'game', props.game );
    const currentBlind = getCurrentBlind( props.game );
    return (
        <div className="panel">
            <div className="panel-header">
                <h4 className="panel-title">Blinds</h4>
            </div>
            <div className="panel-body">{
                props.game.blinds.map( blind => {
                    const BlindTag = blind === currentBlind ? 'h1' : 'p';
                    return (
                        <div className="tile" key={ blind }>
                            <div className="tile-content">
                                <div className="tile-title">
                                    <BlindTag>
                                        { `${ blind } / ${ blind * 2 }` }
                                    </BlindTag>
                                </div>
                            </div>
                        </div>
                    );
                } )
            }</div>
            <footer className="panel-footer">
                <div className="btn-group btn-group-block">
                    <button className="btn" onClick={ () => window.dispatchEvent( new Event( 'raise-blinds' ) ) }>
                        <i className="icon icon-plus"></i>
                        <span>Raise Blinds</span>
                    </button>
                    <button className="btn" onClick={ () => window.dispatchEvent( new Event( 'lower-blinds' ) ) }>
                        <i className="icon icon-minus"></i>
                        <span>Lower Blinds</span>
                    </button>
                </div>
            </footer>
        </div>
    );
}
