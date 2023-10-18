import {defineStore} from "pinia";
import {type Component, shallowRef} from "vue";
import MainLayout from "@/layouts/MainLayout.vue";


export const useLayoutStore = defineStore("layout", () => {

    const state = shallowRef<Component>(MainLayout);

    function setLayout(newLayout: Component | unknown) {
        if (newLayout) {
            state.value = newLayout;
        } else {
            state.value = MainLayout;
        }
    }

    return {
        state,
        setLayout,
    };
});