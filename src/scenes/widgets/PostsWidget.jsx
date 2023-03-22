import { useEffect } from "react";
import React, { Component }  from 'react';
import PostWidget from "./PostWidget";

const PostsWidget = (props) => {

    return (
        <>
            {props.images.map(
                (item, index) => (
                    
                    <PostWidget
                        key={index}
                        id= {item.id}
                        name={"Mrigank Shukla"}
                        author={item.author}
                        tipAmount={item.tipAmount}
                        description={item.description}
                        hash={item.hash}
                        tipImageOwner={props.tipImageOwner}
                    />
                )
            )}
        </>
    );
};

export default PostsWidget;
