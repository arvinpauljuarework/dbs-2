import React from 'react';

import Aux from '../../hoc/Aux';
import Header from '../Navigation/Header/Header';
import YelpGetter from '../YelpGetter/YelpGetter';

const layout = ( props ) => (
    <Aux>

        <Header />
        <YelpGetter />
       
    </Aux>
    
);

export default layout;