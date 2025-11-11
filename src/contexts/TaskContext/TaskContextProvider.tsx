import { useEffect, useReducer } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "./taskReducer";
import { TimerWorkerManager } from "../../workers/TimerWorkerManager";
import { taskActionsTypes } from "./taskActions";

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);

  const worker = TimerWorkerManager.getInstance();

  worker.onmessage((e) => {
    const countDownSeconds = e.data;
    console.log(countDownSeconds);

    dispatch({
      type: taskActionsTypes.COUNT_DOWN,
      payload: { secondsRemaining: countDownSeconds },
    });

    if (countDownSeconds <= 0) {
      dispatch({
        type: taskActionsTypes.COMPLETE_TASK,
      });
      worker.terminate();
    } else {
      dispatch({
        type: taskActionsTypes.COUNT_DOWN,
        payload: {
          secondsRemaining: countDownSeconds,
        },
      });
    }
  });

  useEffect(() => {
    console.log(state);

    if (!state.activeTask) {
      console.log("Worker terminado por falta de activeTask");
      worker.terminate();
    }

    worker.postMessage(state);
  }, [worker, state]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
