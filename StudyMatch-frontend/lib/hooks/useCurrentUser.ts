import { useAppSelector } from "./useAppSelector";


export const useCurrentUser = () => {
  const currentUserId = useAppSelector((state) => state.auth.user?.id);
  
  return {
    isCurrentUser: (userId: number) => userId === currentUserId,
  };
};