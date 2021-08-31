import { GET_CURRENT_PROFILE} from "../actions/types";



const  initialState = {
  profile : null,
  currentProfile : null,
  loading: false,
}

export default function (state=initialState, action) {
  switch (action.type) {
    case GET_CURRENT_PROFILE:
      return {
        ...state,
        currentProfile: action.payload,
        loading: false
      }

      case GET_PROFILE_HANDLE:
        return {
          ...state,
          profile : action.payload,
          loading : false
          
        }
    
    default:
      return state;
  }
}