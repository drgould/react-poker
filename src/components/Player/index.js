import React from 'react';
import db from "../../services/db";

function buyInString( buyIns={}, buyIn ) {
    const cashBuyIn = ( buyIns.cash || [] ).length * buyIn;
    const venmoBuyIn = ( buyIns.venmo || [] ).length * buyIn;
    return `Total: $${ cashBuyIn + venmoBuyIn } Cash: $${ cashBuyIn } Venmo: $${ venmoBuyIn }`;
}

export default class Player extends React.Component {
    constructor() {
        super();
        this.state = {
            user : undefined,
        };
    }

    componentWillMount() {
        const then = user => this.setState( { user } );
        db.fetch( `/users/${ this.props.player.key }`, { then } );
    }

    render() {
        const user = this.state.user;

        let avatar = <div className="loading"></div>;
        let name = <span className="loading centered"></span>;
        let buyIns = '';

        if( user ) {
            avatar = <img src={ user.avatar } alt={ user.name }/>;
            name = user.name;
            buyIns = buyInString( this.props.player.buyIns, this.props.buyIn );
        }

        return (
            <div className="tile">
                <div className="tile-icon">
                    <figure className="avatar avatar-lg">{ avatar }</figure>
                </div>
                <div className="tile-content">
                    <p className="tile-title">{ name }</p>
                    <p className="tile-subtitle">{ buyIns }</p>
                </div>
            </div>
            // <ListItem
            //     avatar="http://lorempixel.com/50/50/business"
            //     caption={ props.player.displayName }
            //     legend={ buyInString( props.player, props.buyIn ) } />
        );
    }
}
