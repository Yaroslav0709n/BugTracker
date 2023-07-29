import { Priorities } from "./enum/Priorities";
import { Statuses } from "./enum/Statuses";
import { Types } from "./enum/Types";

export const mapPriority = (value: number): Priorities => {
  switch (value) {
    case 1:
      return Priorities.Low;
    case 2:
      return Priorities.Medium;
    case 3:
      return Priorities.High;
    default:
      return Priorities.Low;
  }
};

export const mapStatus = (value: number): Statuses => {
  switch (value) {
    case 1:
      return Statuses.Open;
    case 2:
      return Statuses.InProgress;
    case 3:
      return Statuses.Resolved;
    case 4:
      return Statuses.Closed;
    default:
      return Statuses.Open;
  }
};

export const mapType = (value: number): Types => {
  switch (value) {
    case 1:
      return Types.Bug;
    case 2:
      return Types.Feature;
    case 3:
      return Types.Enhancement;
    case 4:
      return Types.Task;
    default:
      return Types.Bug;
  }
};