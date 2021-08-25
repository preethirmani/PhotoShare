import { GET_ALL_POSTS } from "../actions/types";
const intialState = {
  posts: [],
  post: {}
}

export default function (state = intialState, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
          return {
            ...state,
            posts: action.payload,
            }
    default: 
          return state;
    

  }
}