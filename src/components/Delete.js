import React, { useContext, useState } from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import PostContext from "../context/PostContext";
import useRequest from "../hooks/useRequest";

export default function Delete(props) {

    const { posts, deletePost, isLoggedIn } = useContext(PostContext);
    const [pending, setPending] = useState(false);
    const { deletePost: deletePostRequest } = useRequest();
    const id = props.id;
  
    function handleDelete() {
        //online deleting
        if (isLoggedIn) {
            setPending(true);
            async function requestToDelete() {
                try {
                    await deletePostRequest({id: id.toString()});
                    deletePost(id);
                } catch(err) {
                    console.log(err.message || "delete request failed.");
                }
            }
            requestToDelete();
            
        //offline deleting
        } else {
            const newPosts = posts.filter((x) => x._id.toString() !== id.toString());
            localStorage.setItem("myPostIt", JSON.stringify(newPosts));
            deletePost(id);
        }
    }

    return (
        <>
        <button className="delete-button" onClick={handleDelete}>
            {!pending && <DeleteIcon />}
            {pending && <h6>deleting..</h6>}
        </button>
        </>
    )
}
