// Reducer => a function that takes a old state and an action ,return new state...

export default function contextReducer(oldState, action) {
    let transactions;
  switch (action.type) {
    case 'DELETE_TRANSACTION':
      // return all the transactions except the selected one
       return transactions = oldState.filter((item) => item.id !== action.payload)
   
    case 'ADD_TRANSACTION':
         transactions = [action.payload,...oldState]
         return transactions
    default:
      return oldState;
  }
}
