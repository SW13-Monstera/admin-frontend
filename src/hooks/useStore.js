import create from 'zustand';

const useAuthStore = create((set) => ({
  isLogin: false,
  setIsLogin: () => set((state) => ({ isLogin: !state.isLogin })),
}));

export { useAuthStore };
