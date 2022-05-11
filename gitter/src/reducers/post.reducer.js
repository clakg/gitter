import { ADD_POST, GET_POSTS, EDIT_POST, DELETE_POST, ADD_COMMENT } from "../actions/post.action";

const initialState = {}

export default function postReducer(state = initialState, action) {
    switch (action.type) {

        case GET_POSTS:
            return action.payload;

        case ADD_POST:
            return [action.payload, ...state];

        case EDIT_POST:
            return state.map((post) => {
                if (post.id === action.payload.id) {
                    return {
                        ...post,
                        message: action.payload.message,
                    }
                } else {
                    return post
                }
            });

        case DELETE_POST:
            return state.filter((post) => post.id !== action.payload.postId)

        case ADD_COMMENT:
            return state.map((post) => {
                if (post.id === action.payload.postId) {
                    return {
                        ...post,
                        comments: action.payload.data
                    }
                } else {
                    return post
                }
            })


        default:
            return state;
    }
}