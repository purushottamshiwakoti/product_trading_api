import { create } from "zustand";

const useAUthStore = create((set) => ({
  name: "",
  email: "",
  id: "",
  setUserName: (name) => set({ name: name }),
  setUserEmail: (eail) => set({ email: eail }),
  setId: (userId) => set({ id: userId }),
  logout: () => set({ name: "", id: "", email: "" }),
}));

export default useAUthStore;
