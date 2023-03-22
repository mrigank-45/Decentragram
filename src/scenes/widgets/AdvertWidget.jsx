import React, { Component }  from 'react';
import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../../utils/FlexBetween";
import WidgetWrapper from "../../utils/WidgetWrapper";

const AdvertWidget = () => {
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    return (
            <WidgetWrapper>
                <FlexBetween>
                    <Typography color={dark} variant="h5" fontWeight="500">
                        Sponsored
                    </Typography>
                    <Typography color={medium}>Create Ad</Typography>
                </FlexBetween>
                <img
                    width="100%"
                    height="auto"
                    alt="advert"
                    src="https://media.istockphoto.com/id/1292374288/photo/brand-logo-name-identity-and-customer-concept-chalk-board-background.jpg?b=1&s=170667a&w=0&k=20&c=O6H0Ie-OoKppDacYsbo6V88etVG-3fTYmE5nlcLmC-k="
                    style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
                />
                <FlexBetween>
                    <Typography color={main}>MikaCosmetics</Typography>
                    <Typography color={medium}>mikacosmetics.com</Typography>
                </FlexBetween>
                <Typography color={medium} m="0.5rem 0">
                    Your pathway to stunning and immaculate beauty and made sure your skin
                    is exfoliating skin and shining like light.
                </Typography>
            </WidgetWrapper>
    );
};

export default AdvertWidget;
