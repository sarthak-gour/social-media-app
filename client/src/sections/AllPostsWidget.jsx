import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state/authSlice";
import PostWidget from "./PostWidget";

function AllPostsWidget({userId, isProfile = false}) {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);

    const getPosts = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };

    const getUserPosts = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/posts/${userId}/posts`,{
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };

    useEffect(() => {
        if(isProfile){
            getUserPosts();
        } 
        else{
            getPosts();
        }
    }, []);

    return (
        <>
            {posts.slice(0).reverse().map(
                ({
                    _id,
                    userId,
                    fName,
                    lName,
                    description,
                    location,
                    picturePath,
                    userPicturePath,
                    likes,
                    createdAt
                }) => (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        name={`${fName} ${lName}`}
                        description={description}
                        location={location}
                        picturePath={picturePath}
                        userPicturePath={userPicturePath}
                        likes={likes}
                        createdAt={createdAt}
                    />
                )
            )}
        </>
    );
};

export default AllPostsWidget;