import { GET_CURRENT_PROFILE, CREATE_PROFILE} from "../actions/types";



const initialState = {
  profile:null
}

export default function (state=initialState, action) {
  switch (action.type) {
    case GET_CURRENT_PROFILE:
      return {
        ...state,
        profile: action.payload
      }
      
    default:
      return state;
  }
}