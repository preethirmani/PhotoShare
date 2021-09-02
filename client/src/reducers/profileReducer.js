
import { GET_CURRENT_PROFILE, GET_FOLLOWERS, GET_FOLLOWING, GET_PROFILE_HANDLE} from "../actions/types";



const  initialState = {
  profile : null,
  currentProfile : null,
  loading : false,
  following : null,
  followers : null
}

export default function (state=initialState, action) {
  switch (action.type) {
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

    
    default:
      return state;
  }
}