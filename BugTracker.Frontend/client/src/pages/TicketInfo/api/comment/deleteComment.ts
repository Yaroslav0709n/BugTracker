import axios from "axios";
import getToken from "../../../../common/getToken";

export const deleteComment = async (commentId: string, setIsLoading: (value: React.SetStateAction<boolean>) => void) => {
    try {
      setIsLoading(true);
      const config = {
        url: `https://localhost:7088/api/Commentary?commentId=${commentId}`,
        method: 'DELETE',
        headers: getToken(),
      };

      await axios(config);
      setIsLoading(false);
      window.location.reload();
    } catch (error: any) {
      setIsLoading(false);
      console.log(error.response);
    }
  };