import React from 'react';

import  './styles.less';

import { getBlindLevel, getCurrentBlind } from '../../services/timer';
import { getBlindString } from "../../services/util";

export default ( props ) => {
    const { blinds } = props.game.options;
    const level = getBlindLevel( props.game );
    const currentBlind = getCurrentBlind( props.game );
    let prevBlind = '\u00a0';
    let nextBlind = '\u221e/\u221e';

    if( level > 0 ) {
        const prev = blinds[ level - 1 ];
        prevBlind = getBlindString( prev );
    }

    if( level < blinds.length - 1 ) {
        const next = blinds[ level + 1 ];
        nextBlind = getBlindString( next );
    }
    return (
        <div className="panel panel__blinds-panel">
            <div className="panel-header">
                <h4 className="panel-title">Blinds</h4>
            </div>
            <div className="panel-body">
                <div className="container">
                    <div className="columns">
                        <div className="column panel__blinds-panel__blinds">
                            <h4 className="text-center">{ nextBlind }</h4>
                            <h1 className="text-center">{ currentBlind }/{ currentBlind * 2 }</h1>
                            <h4 className="text-center">{ prevBlind }</h4>
                        </div>
                        <div className="column">
                            <div className="btn-group btn-group-vertical">
                                <button className="btn btn-action" onClick={ () => window.dispatchEvent( new Event( 'raise-blinds' ) ) }>
                                    <i className="icon icon-plus"></i>
                                </button>
                                <button className="btn btn-action" onClick={ () => window.dispatchEvent( new Event( 'lower-blinds' ) ) }>
                                    <i className="icon icon-minus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
