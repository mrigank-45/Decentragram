import { Box, Typography, useTheme } from "@mui/material";
import React, { Component }  from 'react';
import Friend from "../../utils/Friend";
import WidgetWrapper from "../../utils/WidgetWrapper";

const FriendListWidget = () => {
    const { palette } = useTheme();

    let friends = [{ "name": "Mrigank Shukla", "subtitle": "Teacher", "imgLink": "" }, { "name": "Divjot Singh", "subtitle": "Doctor", "imgLink": "" }]


    return (
        <WidgetWrapper>
            <Typography
                color={palette.neutral.dark}
                variant="h5"
                fontWeight="500"
                sx={{ mb: "1.5rem" }}
            >
                Friend List
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">
                {friends.map((item) => (
                    <Friend
                        name={item.name}
                        subtitle={item.subtitle}
                        link={item.imgLink}
                    />
                ))}
            </Box>
        </WidgetWrapper>
    );
};

export default FriendListWidget;
