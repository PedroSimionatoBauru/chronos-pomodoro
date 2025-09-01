import { TaskStateModel } from "../../models/TaskStateModel";
import { formatSecondsToMinutes } from "../../utils/formatSecondsToMinuts";
import { getNextCycle } from "../../utils/getNextCycle";
import { TaskActionModel, taskActionsTypes } from "./taskActions";

export function taskReducer(
  state: TaskStateModel,
  action: TaskActionModel
): TaskStateModel {
  switch (action.type) {
    case taskActionsTypes.START_TASK: {
      const newTask = action.payload;
      const nextCycle = getNextCycle(state.currentCycle);
      const secondsRemaining = newTask.duration * 60;

      return {
        ...state,
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
        tasks: [...state.tasks, newTask],
      };
    }
    case taskActionsTypes.INTERRUPT_TASK: {
      return state;
    }
    case taskActionsTypes.RESET_STATE: {
      return state;
    }
  }
  // Sempre deve retornar o estado
  return state;
}
