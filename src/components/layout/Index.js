import React from 'react';
import Tracks from '../tracks/Tracks';
import Search from '../tracks/Search';
import Top from '../tracks/Top';

const Index = () => {
    return (
        <React.Fragment>
            <Search></Search>
            <Top></Top>
            <Tracks></Tracks>
        </React.Fragment>
    )
}

export default Index;