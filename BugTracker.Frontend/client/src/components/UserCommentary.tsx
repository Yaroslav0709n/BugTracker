import axios, { AxiosRequestConfig } from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import errorStyles from '../assets/componentsstyle/errorstyle.module.css';
import commentStyles from '../assets/componentsstyle/comments.module.css';
import { useParams } from 'react-router-dom';
import { UserContext } from '../UserContext';
import jwt_decode from 'jwt-decode';
import AddInput from './Inputs/AddInput';
import AddButton from './Buttons/AddButton';
import {Commentary, CommentaryDto} from '../interface/Commentary'
import CommentaryList from './ListComponents/CommentaryList';
import { createComment } from '../pages/TicketInfo/api/comment/createComment';


const UserCommentary: React.FC = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const [comments, setComments] = useState<Commentary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newComment, setNewComment] = useState<CommentaryDto>({
    text: '',
  });
  const { userId } = useContext(UserContext);
  const [firstName, setFirstName] = useState(localStorage.getItem('firstName') || '');
  const [lastName, setLastName] = useState(localStorage.getItem('lastName') || '');
  const [userEmail, setUserEmail] = useState<string>('');
  const [ticketUsers, setTicketUsers] = useState<any[]>([]);
  const [userEmailExists, setUserEmailExists] = useState(false);
  const [error, setError] = useState<{ [key: string]: string }>({});

  const token = localStorage.getItem('accessToken');
  const headers: AxiosRequestConfig['headers'] = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    if (userId) {
      localStorage.setItem('firstName', firstName);
      localStorage.setItem('lastName', lastName);
    }
  }, [userId, firstName, lastName]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const config: AxiosRequestConfig = {
          url: `https://localhost:7088/api/Commentary?ticketId=${ticketId}`,
          method: 'GET',
          headers
        };
        const response = await axios(config);
        const commentData = response.data;
        setComments(commentData.$values);
      } catch (error: any) {
        console.log(error.response);
      }
    };
    fetchComments();
  }, [ticketId]);

  useEffect(() => {
    const fetchTicketUsers = async () => {
      try {
        if (token) {
          const decodedToken: any = jwt_decode(token);
          const email = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
          setUserEmail(email);
        } 
        const config: AxiosRequestConfig = {
          url: `https://localhost:7088/api/TicketUser?ticketId=${ticketId}`,
          method: 'GET',
          headers
        };
        const response = await axios(config);
        const userData = response.data;
        setTicketUsers(userData.$values);
      } catch (error: any) {
        console.log(error.response);
      }
    };

    fetchTicketUsers();
  }, [ticketId]); 
  
  useEffect(() => {
    const emailExists = ticketUsers.some((user) => user.email === userEmail);
    setUserEmailExists(emailExists);
  }, [ticketUsers, userEmail]);




  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setNewComment((prevNewComment) => ({
      ...prevNewComment,
      [name]: value,
    }));
  };

  return (
    <div className={commentStyles.commentaryContainer}>
      <div>
        <h3>Ticket Comments</h3>
        {userEmailExists == true && ( 
          <div>
            {error.text && <div className={errorStyles.error}>{error.text}</div>}
            <AddInput
              type="text"
              id="text"
              name="text"
              value={newComment.text}
              onChange={handleInputChange}
              placeholder="Enter your commentary"
              onFocus={() => setError((prevError) => ({ ...prevError, text: '' }))}
              className={`${error.text && errorStyles.errorInput}`}
            />
            <AddButton 
              onClick={() => createComment(ticketId, setIsLoading, newComment, setError)} 
            >
              Add
            </AddButton>
          </div>
        )}
        <CommentaryList comments={comments} 
                        firstName={firstName} 
                        lastName={lastName} 
                        userEmailExists={userEmailExists} 
                        setIsLoading={setIsLoading}/>
      </div> 
    </div>
  );
};

export default UserCommentary;