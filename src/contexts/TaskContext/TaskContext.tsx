import { createContext } from "react";
import { TaskStateModel } from "../../models/TaskStateModel";
import { initialTaskState } from "./initialTaskState";
import { TaskActionModel } from "./taskActions";

type TaskContextProps = {
  state: TaskStateModel;
  dispach: React.Dispatch<TaskActionModel>;
};

const initialContextValue = {
  state: initialTaskState,
  dispach: () => {},
};

export const TaskContext = createContext<TaskContextProps>(initialContextValue);
