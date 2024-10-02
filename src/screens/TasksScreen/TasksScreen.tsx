import { memo, useCallback, useRef, useState } from "react";
import { FlatList, Image, View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";
import { Input, type InputRef } from "~/components";
import { TaskStatus } from "~/models/Task";
import Animated, {
  LinearTransition,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated";
import { TaskItem } from "~/screens/TasksScreen/TaskItem";
import { useTasks, useTasksActions } from "~/context";

const TasksScreen = () => {
  const inputRef = useRef<InputRef>(null);

  const { tasks } = useTasks();
  const { createTask } = useTasksActions();

  const [quote, setQuote] = useState<string | undefined>(undefined);

  const _handleSubmitTask = useCallback(() => {
    const name = inputRef.current?.getValue();
    if (!inputRef.current || !name?.length) return;

    inputRef.current.clear();

    createTask({
      name,
      id: new Date().valueOf().toString(),
      createdAt: new Date().toISOString(),
      status: TaskStatus.pending,
    });
  }, []);

  const _handleComplete = useCallback((quote: string) => {
    setQuote(quote);
    // Auto-close
    setTimeout(() => setQuote(undefined), 6000);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="relative flex-1 w-full flex flex-col items-center p-4 gap-4 max-w-[500px] tablet:self-center">
        <Text className="text-start w-full font-bold text-lg">To-do List</Text>
        <Input
          ref={inputRef}
          placeholder="Enter your task..."
          className="w-full"
          placeholderTextColor={colors.gray[400]}
          onSubmitEditing={_handleSubmitTask}
          rightAccessory={({ value }) =>
            !!value?.length ? (
              <TouchableOpacity
                onPress={_handleSubmitTask}
                className="flex items-center justify-center rounded-full h-[32px] aspect-square"
              >
                <Image
                  source={require("@assets/plus_icon.png")}
                  tintColor={colors.blue[500]}
                  className="max-h-[20px] max-w-[20px] object-contain aspect-square"
                />
              </TouchableOpacity>
            ) : null
          }
        />

        <Animated.FlatList
          data={tasks}
          className="w-full px-1"
          itemLayoutAnimation={LinearTransition}
          keyExtractor={(item) => item.id}
          renderItem={({ item: task }) => (
            <TaskItem task={task} onComplete={_handleComplete} />
          )}
        />

        {!!quote && (
          <Animated.View
            className="absolute bottom-2 left-4 right-4 bg-green-50 p-4 rounded flex flex-col gap-1"
            entering={SlideInDown}
            exiting={SlideOutDown}
          >
            <Text className="text-lg font-medium text-green-700">
              Task completed!
            </Text>
            <Text className="text-sm text-green-700">{quote}</Text>
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default TasksScreen;
