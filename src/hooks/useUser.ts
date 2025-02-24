import { useQuery } from "@tanstack/react-query";
import  { fetchUser } from "@/services/userService";

export const useUser = (userId: string) => {
    return useQuery({
        queryKey: ["user", userId],
        queryFn: () => fetchUser(userId),
        enabled: !!userId, // Only fetch if userId exists
    });
}