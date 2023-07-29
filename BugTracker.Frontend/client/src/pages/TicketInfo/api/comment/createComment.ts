import axios from "axios";
import getToken from "../../../../common/getToken";
import { CommentaryDto } from "../../../../interface/Commentary";
import handleError from '../../../Tickets/error/errorHandler';

export const createComment = async (ticketId: string | undefined,
                                    setIsLoading: (value: React.SetStateAction<boolean>) => void, 
                                    newComment: CommentaryDto,
                                    setError: React.Dispatch<React.SetStateAction<{
                                        [key: string]: string;
                                    }>>) => {
    try {
      setIsLoading(true);
      const config = {
        url: `https://localhost:7088/api/Commentary?ticketId=${ticketId}`,
        method: 'POST',
        headers: getToken(),
        data: {
          text: newComment.text,
        },
      };

      const response = await axios(config);
      console.log(response.data)

      setIsLoading(false);
      window.location.reload();
    } catch (error: any) {
      setIsLoading(false);
      handleError(error, setError)    
    }
  };