import { AccountActionAll, AccountActionTypes } from '../actions';
import { AccountState } from '../datatypes';

export const initialState: AccountState = {
  user: null,
  inProgress: false,
  errMsg: ''
};

export function reducer(state = initialState, action: AccountActionAll): AccountState {
  switch (action.type) {
    case AccountActionTypes.FETCH_MY_INFO: {
      return {
        ...state,
        user: JSON.parse(localStorage.getItem('user') || '')
      };
    }
      
    case AccountActionTypes.LOGIN: {
      return {
        ...state,
        inProgress: true,
        errMsg: ''
      };
    }
    
    case AccountActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        inProgress: false,
        errMsg: ''
      }
    }
      
    case AccountActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        inProgress: false,
        errMsg: action.payload || 'Action failed'
      }
    }
    
    default: {
      return state;
    }
  }
}
