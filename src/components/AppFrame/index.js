import React from 'react';
import { Layout, Panel } from 'react-toolbox/lib/layout';

import Header from '../PageHeader';
import styles from './styles.css';

export default class AppFrame extends React.Component {
    render() {
        return (
                <Layout>
                    <Panel className={styles.panel}>
                        <Header/>
                        { this.props.children }
                    </Panel>
                </Layout>
        )
    }
};
