import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
} from "@mui/icons-material";
import { IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../utils/FlexBetween";
import Friend from "../../utils/Friend";
import React, { Component } from 'react';
import WidgetWrapper from "../../utils/WidgetWrapper";
import { useState } from "react";

const PostWidget = (props) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const Author = props.author.slice(0,20)+"..."

    const clickLike = ()=>{
        if (isLiked == true) {
            setIsLiked(false);
            setLikeCount(0);
        }
        else{
            setIsLiked(true);
            setLikeCount(1);
        }
    }


    return (

        <WidgetWrapper m="2rem 0">
            <Friend link={props.author} name={Author}/>
            <Typography color={main} sx={{ mt: "1rem" }}>
                {props.description}
            </Typography>
            {props.hash && (
                <img
                    width="100%"
                    height="auto"
                    alt="post"
                    style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                    src={`https://DecentragramDapp.infura-ipfs.io/ipfs/${props.hash}`}
                />
            )}
            <FlexBetween mt="0.25rem">

                <li key={props.key} style={{border:"none",width:"100%"}}>
                    <small className="float-left text-muted" style={{marginLeft:"5px", fontSize:"16px"}}>
                        TIPS: {window.web3.utils.fromWei(props.tipAmount.toString(), 'Ether')} ETH
                    </small>
                    <button
                        className="btn btn-link float-right pt-0"
                        name={props.id}
                        onClick={(event) => {
                            let tipAmount = window.web3.utils.toWei('0.1', 'Ether')
                            console.log(props.key, tipAmount)
                            props.tipImageOwner(event.target.name, tipAmount)
                        }}
                    >
                        TIP 0.1 ETH
                    </button>
                </li>
            </FlexBetween>
            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        <IconButton
                        onClick={()=>{clickLike()}}
                        >
                            {isLiked ? (
                                <FavoriteOutlined sx={{ color: primary }} />
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>

                    <FlexBetween gap="0.3rem">
                        <IconButton >
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>{Math.floor(Math.random() * 10)}</Typography>
                    </FlexBetween>
                </FlexBetween>

                <IconButton>
                    <ShareOutlined />
                </IconButton>
            </FlexBetween>

        </WidgetWrapper>
    );
};

export default PostWidget;
