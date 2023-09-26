import { create, StateCreator } from 'zustand';
import { createJSONStorage, persist, PersistOptions } from 'zustand/middleware';

type AuthStore = {
  accessToken: string | null;
  permissions: string[];
  setAccessToken: (token: string) => void;
  setPermissions: (permissions: string[]) => void;
}

type MyPersist = (
  config: StateCreator<AuthStore>,
  options: PersistOptions<AuthStore>
) => StateCreator<AuthStore>

const useAuthStore = create<AuthStore, []>(
  (persist as MyPersist)(
    (set): AuthStore => ({
      accessToken: null,
      permissions: [],
      setAccessToken: (token: string) => set(() => ({ accessToken: token })),
      setPermissions: (permissions: string[]) => set(() => ({ permissions })),
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useAuthStore;