import React from 'react';
import PropTypes from 'prop-types';
//Style
import { Wrapper, Content } from './Grid.style';

const Grid = ({ header, children }) => (
    <Wrapper>
        <h1>{header}</h1>
        <Content>{children}</Content>
    </Wrapper>
)

Grid.propTypes = {
    header: PropTypes.string
}

export default Grid;
