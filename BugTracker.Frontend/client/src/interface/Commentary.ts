export interface Commentary {
    id: string;
    text: string;
    createTime: string;
    createdByUserId: string;
}
  
export interface CommentaryDto {
    text: string;
}