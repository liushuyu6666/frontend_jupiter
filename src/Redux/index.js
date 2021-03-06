import {createStore, combineReducers} from "redux";
import userReducer from "./user/reducer";
import shopReducer from "./shop/reducer";
import cartReducer from "./cart/reducer";
import serverReducer from "./server/reducer";

// persist profile while refresh the web page
const saveToLocalStorage = state => {
    // console.log("saveToLocalStorage");
    // console.log(state);
    try{
        const reduxStateUser = JSON.stringify(state.user); // ? state.user
        localStorage.setItem("reduxStateUser", reduxStateUser);

        const reduxStateCart = JSON.stringify(state.cart);
        localStorage.setItem("reduxStateCart", reduxStateCart);
    } catch (e){
        console.log(e);
    }
}

const persistedState = () => {
    try{
        const serializedStateUser = localStorage.getItem("reduxStateUser");
        if(serializedStateUser === null) return undefined;
        let persistedValueUser = JSON.parse(serializedStateUser);

        const serializedStateCart = localStorage.getItem("reduxStateCart");
        if(serializedStateCart === null) return undefined;
        let persistedValueCart = JSON.parse(serializedStateCart);

        return {user: persistedValueUser,
                cart: persistedValueCart};
    } catch (e){
        console.log(e);
        return undefined;
    }
}

const rootReducer = combineReducers({
    user: userReducer,
    // shop: shopReducer,
    cart: cartReducer,
    server: serverReducer,
})

// const persistedState = loadFromLocalStorage();

const store = createStore(
    rootReducer,
    persistedState(),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;