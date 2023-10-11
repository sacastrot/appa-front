import { defineStore } from "pinia";

export const useProfileDetailsStore = defineStore("profileDetails",{
  state: () => {
    return {
      name: "Toph Beifong",
      phone: "8746945234",
      email: "tophbei@acarreosappa.com",
      password: "loquesea123@D",
    };
  },
  actions: {
    editProfile(name : string, phone : string, email : string, password : string){
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.password = password;
    }
  }
});
