import { create } from "zustand";

export const useAuthStore = create((set)=>({
    authUser: {name: "John Doe", _id:123, age:25},
    isLoggedIn: false,
    login:()=>{
        console.log("We just logged in");
        //  After login , update isLoggedIn to true
        //  we use set here to update the states
        set({isLoggedIn: true})
    }
}))