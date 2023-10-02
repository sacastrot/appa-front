import {defineStore} from 'pinia'
import {ref} from "vue";

export const useReturnHomeStore = defineStore("returnHome", () => {
    const state = ref<number>(0)

    //actions
    function setReturnHome(returnHome: number) {
        state.value = returnHome;
    }

    return {
        state,
        setReturnHome,
    }
})