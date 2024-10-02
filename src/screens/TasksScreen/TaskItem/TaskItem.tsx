import { memo, useCallback, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import colors from "tailwindcss/colors";
import { useTasksActions } from "~/context";
import { useQuery } from "~/hooks/useQuery";
import type { Quote } from "~/models/Quote";
import { type Task, TaskStatus } from "~/models/Task";

type TaskItemProps = {
  task: Task;
  onComplete: (quote: string) => void;
};

const TaskItem = memo<TaskItemProps>(({ task, onComplete }) => {
  const { deleteTask, completeTask } = useTasksActions();

  const {
    data,
    error,
    isLoading,
    fetch: fetchQuote,
  } = useQuery<Quote[]>({
    // Using http instead of https was the only way to skip cert validation on native OS side for mobile
    url: "http://api.quotable.io/quotes/random?limit=1&maxLength=255",
    handlers: {
      onSuccces: (data) => {
        onComplete(data.at(0)?.content ?? "");
        completeTask(task.id);
      },
    },
  });

  const completed = task.status === TaskStatus.completed;

  const _handleDelete = useCallback(() => deleteTask(task.id), [task.id]);

  console.log("er", error);
  return (
    <View
      key={task.id}
      className="h-[40px] w-full flex flex-row items-center justify-between gap-2"
    >
      <TouchableOpacity
        onPress={fetchQuote}
        disabled={completed}
        className="flex-1 flex flex-row gap-2"
      >
        {!!isLoading ? (
          <ActivityIndicator size="small" />
        ) : (
          <View className="border-2 border-slate-400 rounded-full w-[20px] aspect-square p-[2px]">
            {completed && <View className="flex-1 rounded-full bg-slate-400" />}
          </View>
        )}

        <Text
          className={`flex-1 text-black ${
            completed ? "line-through text-slate-500" : ""
          }`}
        >
          {task.name}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={_handleDelete}>
        <Image
          source={require("@assets/trash_icon.png")}
          tintColor={colors.slate[400]}
          className="max-h-[20px] max-w-[20px] object-contain aspect-square"
        />
      </TouchableOpacity>
    </View>
  );
});

export default TaskItem;
