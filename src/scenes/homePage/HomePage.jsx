import { Box, useMediaQuery } from "@mui/material";
import React, { Component } from 'react';
import Navbar from "../navbar/Navbar";
import UserWidget from "../widgets/UserWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import AdvertWidget from "../widgets/AdvertWidget";
import FriendListWidget from "../widgets/FriendListWidget";

const HomePage = (props) => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    return (
        <Box>
            <Navbar setMode={props.setMode} account={props.account} />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidget />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <MyPostWidget
                        captureFile={props.captureFile}
                        uploadImage={props.uploadImage}
                        tipImageOwner={props.tipImageOwner}
                        decentragram={props.decentragram}
                        buffer={props.buffer}
                        setBuffer={props.setBuffer}
                    />
                    <PostsWidget images={props.images} tipImageOwner={props.tipImageOwner}/>
                </Box>
                {isNonMobileScreens && (
                    <Box flexBasis="26%">
                        <AdvertWidget />
                        <Box m="2rem 0" />
                        <FriendListWidget />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default HomePage;
