import { Box } from "@mui/material";
import React, { Component }  from 'react';
import Identicon from 'identicon.js';

const UserImage = ({ account = "64237672hdby2y38gy4gfbgf873fg3", size = "60px" }) => {
    return (
        <Box width={size} height={size}>
            <img
                style={{ objectFit: "cover", borderRadius: "50%" }}
                width={size}
                height={size}
                alt="user"
                src={`data:image/png;base64,${new Identicon(account, 30).toString()}`}
            />
        </Box>
    );
};

export default UserImage;
