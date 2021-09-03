
import { 
  GET_CURRENT_PROFILE, 
  GET_FOLLOWERS, 
  GET_FOLLOWING, 
  GET_PROFILE_HANDLE,
  CLEAR_CURRENT_PROFILE,
  PROFILE_LOADING,
  GET_SUGGESTIONS } from "../actions/types";



const  initialState = {
  profile : null,
  currentProfile : null,
  loading : false,
  following : null,
  followers : null,
  suggestions : null
}

export default function (state=initialState, action) {
  switch (action.type) {

    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
      
    case GET_CURRENT_PROFILE:
      return {
        ...state,
        currentProfile : action.payload,
        loading : false
      };

      case GET_PROFILE_HANDLE:
        return {
          ...state,
          profile : action.payload,
          loading : false
          
        };

        case GET_FOLLOWING:
          return {
            ...state,
            following : action.payload,
            loading : false
          };

        case GET_FOLLOWERS:
          return {
            ...state,
            followers : action.payload,
            loading : false
          };
         case GET_SUGGESTIONS:
          return {
            ...state,
            suggestions : action.payload,
            loading : false
          };

        case CLEAR_CURRENT_PROFILE:
          return {
            ...state,
            profile: null
          };
        default:
          return state;
  }
}