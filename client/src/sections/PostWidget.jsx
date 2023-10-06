import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBw from "components/FlexBw";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state/authSlice";
import moment from 'moment'


function PostWidget({ postId, postUserId, name, description, location, picturePath, userPicturePath, likes, createdAt }) {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;

    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const patchLike = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/posts/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: loggedInUserId }),
        });

        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
    };

    return (
        <WidgetWrapper m="2rem 0">
            <Friend
                friendId={postUserId}
                name={name}
                subtitle={moment(createdAt).fromNow()}
                userPicturePath={userPicturePath}
            />

            <Typography color={main} sx={{ mt: "1rem" }}>
                {description}
            </Typography>
            {picturePath && (
                <img
                width="100%"
                height="auto"
                alt="post"
                style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                src={`${process.env.REACT_APP_BACKEND_URL}/assets/${picturePath}`}
                />
            )}

            <FlexBw mt="0.25rem">
                <FlexBw gap="1rem">
                    <FlexBw gap="0.3rem">
                        <IconButton onClick={patchLike}>
                            { isLiked ? <FavoriteOutlined sx={{ color: primary }} /> : <FavoriteBorderOutlined /> }
                        </IconButton>

                        <Typography>{likeCount}</Typography>
                    </FlexBw>

                    <FlexBw gap="0.3rem">
                        <IconButton>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>0</Typography>
                    </FlexBw>
                </FlexBw>

                <IconButton>
                    <ShareOutlined />
                </IconButton>
            </FlexBw>

        </WidgetWrapper>
    );
}

export default PostWidget;