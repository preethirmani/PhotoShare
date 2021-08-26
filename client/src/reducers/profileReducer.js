import { GET_CURRENT_PROFILE, CREATE_PROFILE} from "../actions/types";



const  initialState = {
  profile : null,
  currentProfile : null
}

export default function (state=initialState, action) {
  switch (action.type) {
    case GET_CURRENT_PROFILE:
      return {
        ...state,
        currentProfile: action.payload
      }
      
    default:
      return state;
  }
}