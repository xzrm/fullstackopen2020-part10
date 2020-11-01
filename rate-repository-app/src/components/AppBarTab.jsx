import React from 'react';
import Text from './Text';


const AppBarTab = ({ text }) => {
    return (
    <Text color="textPrimaryContrast" fontWeight="bold"
        fontSize="heading">{text}</Text>
    );
};

export default AppBarTab;