import React, { CSSProperties } from 'react';
import { Commentary } from '../../interface/Commentary';
import moment from 'moment';
import btnStyles from '../../assets/componentsstyle/buttonstyle.module.css';
import listStyles from '../../assets/componentsstyle/liststyle.module.css';
import { deleteComment } from '../../pages/TicketInfo/api/comment/deleteComment';
import ControlButton from '../Buttons/ControlButton';

interface ListProps {
    comments: Commentary[];
    firstName: string,
    lastName: string,
    userEmailExists: boolean,
    setIsLoading: (value: React.SetStateAction<boolean>) => void
}

const commentListContainer: CSSProperties = {
    width: "450px",
    paddingTop: "10px",
    marginBottom: "10px",
    display: "flex",
    cursor: "pointer",
    fontSize: "14px",
}

const CommentaryList: React.FC<ListProps> = ({comments, firstName, lastName, userEmailExists, setIsLoading}) => {
    
  return (
    <div>
        <ul className={listStyles.commentList}>
            {comments.map((comment) => (
              <li key={comment.id} style={commentListContainer}>
                <p style={{ width: "100px",
                            wordWrap: "break-word",
                            fontSize: "13px", 
                            marginTop: "15px"
                          }}>{comment.createdByUserId}</p>
                <p style={{ width: "200px",
                            wordWrap: "break-word",
                            fontWeight: "bold"
                          }}>{comment.text}</p>
                <p style={{ width: "90px",
                            wordWrap: "break-word",
                            fontSize: "13px", 
                            marginTop: "15px",
                            marginLeft: "40px",
                          }}>{moment(comment.createTime).format('HH:mm DD-MM')}</p>
                {comment.createdByUserId === `${firstName} ${lastName}` && userEmailExists == true && (
                  <ControlButton
                    className={btnStyles.redButton}
                    onClick={() => deleteComment(comment.id, setIsLoading)}
                    style={{height: "30px",
                            width: "30px",
                            marginTop: "9px",
                            marginLeft: "25px"}}
                    >
                    X 
                  </ControlButton>
                )}
              </li>
            ))}
          </ul>
    </div>
  );
};

export default CommentaryList;