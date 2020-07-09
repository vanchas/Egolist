const initialState = {

}

export default (state = initialState, action: any) => {
  switch (action.payload) {

    case 'typeName':
      return { ...state, action }

    default:
      return state
  }
}
