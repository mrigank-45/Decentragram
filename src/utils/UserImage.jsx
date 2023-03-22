import { Box } from "@mui/material";
import React, { Component }  from 'react';

const UserImage = ({ link, size = "60px" }) => {
    return (
        <Box width={size} height={size}>
            <img
                style={{ objectFit: "cover", borderRadius: "50%" }}
                width={size}
                height={size}
                alt="user"
                src={link}
            />
        </Box>
    );
};

export default UserImage;
