import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useMenu = () => {
    const [axiosSecure] = useAxiosSecure()

    const { data: menu = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const menu = await axiosSecure.get('/menu')
            return menu.data
        }

    })
    return [menu, loading, refetch]
}

export default useMenu;