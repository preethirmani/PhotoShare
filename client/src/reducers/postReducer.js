import { DELETE_POST, GET_ALL_POSTS, GET_POST, GET_USER_POSTS } from "../actions/types";


const intialState = {
  posts: [],
  post: {},
  userPosts : [],
  loading: false
}

export default function (state = intialState, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
          return {
            ...state,
            posts: action.payload,
            loading: false
            }
    case GET_POST:
          return {
            ...state,
            post:action.payload,
            loading:false
            }

    case GET_USER_POSTS:
          return {
            ...state,
            userPosts:action.payload,
            loading:false
            }

     case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    default: 
          return state;
    

  }
}