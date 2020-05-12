import {v4 as uuid} from 'uuid';

 
export const driverReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_DRIVER':
            return [...state,{
                title: action.driver.title,
                typeV: action.driver.typeV,
                id: uuid()
            }]
            
        case 'REMOVE_DRIVER':
            return state.filter(driver => driver.id !== action.id)
    
        default:
            return state;
    }
   
}
 
export default driverReducer;