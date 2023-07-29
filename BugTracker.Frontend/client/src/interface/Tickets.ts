import { Priorities } from "../enum/Priorities";
import { Statuses } from "../enum/Statuses";
import { Types } from "../enum/Types";

export interface Ticket {
    $id: string;
    id?: string;
    title: string;
    description: string;
    createdByUserId: string;
}
  
export interface TicketDto {
    name: string;
    description: string;
    priority: Priorities;
    status: Statuses;
    type: Types;
}

export interface TicketInfo {
    $id: string;
    title: string;
    description: string;
    createTime: string;
    updateTime: string;
    priority: number;
    status: number;
    type: number;
    createdUserName: string;
}

export interface TicketInfoDto {
    title: string;
    description: string;
    updateTime: string;
}