import { defineStore } from "pinia";
import { ref } from "vue";
import type { Bisonte } from "@/types/intefaces";

export const useBisontesStore = defineStore("bisontes", () => {
  const state = ref<Bisonte>({
    id: undefined,
    created: undefined,
    name: undefined,
    email: undefined,
    vehicle: undefined,
  });
  const bisontes = ref<Bisonte[]>([]);

  fillWithTestData();

  function fillWithTestData() {
    const testData: Bisonte[] = [
      {
        id: 1,
        created: new Date(),
        name: "Bisonte 1",
        email: "bisonte1@example.com",
        vehicle: "BisonMobile",
      },
      {
        id: 2,
        created: new Date(),
        name: "Bisonte 2",
        email: "bisonte2@example.com",
        vehicle: "BisonCycle",
      },
      {
        id: 3,
        created: new Date(),
        name: "Bisonte 3",
        email: "bisonte3@example.com",
        vehicle: "BisonCar",
      },
      {
        id: 4,
        created: new Date(),
        name: "Bisonte 4",
        email: "bisonte4@example.com",
        vehicle: "BisonCar",
      },
      {
        id: 5,
        created: new Date(),
        name: "Bisonte 5",
        email: "bisonte5@example.com",
        vehicle: "BisonCar",
      },
    ];

    bisontes.value = testData;
  }

  function searchBisonte(id: number): Bisonte | undefined {
    return bisontes.value.find((bisonte) => bisonte.id === id);
  }

  function searchBisonteEmail(email: string): Bisonte[] | undefined {
    if (email) {
      return bisontes.value.filter((bisonte) => bisonte.email?.includes(email));
    }
  }

  function searchVehicle(vehicle: string): Bisonte | undefined {
    return bisontes.value.find((bisonte) => bisonte.vehicle === vehicle);
  }

  //actions
  function setCreatedDate() {
    state.value.created = new Date();
  }
  function setId(id: number) {
    state.value.id = id;
  }
  function setName(name: string) {
    state.value.name = name;
  }
  function setEmail(email: string) {
    state.value.email = email;
  }
  function setVehicle(vehicle: string) {
    state.value.vehicle = vehicle;
  }
  function addBisonte() {
    bisontes.value.push(state.value);
  }
  function deleteBisonte(id: number | undefined) {
    if (!id) return;
    const index = bisontes.value.findIndex((bisonte) => bisonte.id === id);
    bisontes.value.splice(index, 1);
  }

  function resetBisonte() {
    state.value = {
      id: undefined,
      created: undefined,
      name: undefined,
      email: undefined,
      vehicle: undefined,
    };
  }

  return {
    state,
    bisontes,
    addBisonte,
    setCreatedDate,
    setId,
    setName,
    setEmail,
    setVehicle,
    searchBisonte,
    searchBisonteEmail,
    searchVehicle,
    resetBisonte,
    deleteBisonte,
  };
});
