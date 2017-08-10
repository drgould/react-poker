import React from 'react';

import Header from '../PageHeader';
import Container from '../Container';
import './styles.less';

export default ( props ) => (
    <div>
        <Header/>
        <Container>
            { props.children }
        </Container>
    </div>
);
