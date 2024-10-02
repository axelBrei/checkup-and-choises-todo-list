import {
  forwardRef,
  memo,
  useImperativeHandle,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { TextInput, View, type TextInputProps } from "react-native";

export type InputProps = TextInputProps & {
  rightAccessory?: (props: { value?: string }) => ReactNode;
  inputClassName?: string;
};

export type InputRef = {
  clear: () => void;
  getValue: () => string;
  focus: () => void;
  blur: () => void;
};

const Input = memo(
  forwardRef<InputRef, InputProps>(
    ({ rightAccessory, className, ...props }, ref) => {
      const localRef = useRef<TextInput>(null);

      // Uncontrolled by default
      const [value, setValue] = useState("");

      useImperativeHandle(
        ref,
        () => {
          return {
            getValue: () => value,
            focus: () => localRef.current?.focus(),
            blur: () => localRef.current?.blur(),
            clear: () => setValue(""),
          };
        },
        [value]
      );

      return (
        <View className="relative w-full h-[46px]">
          <TextInput
            {...props}
            ref={localRef}
            value={value}
            onChangeText={setValue}
            className={`flex-1 outline-none rounded bg-slate-100 flex flex-row items-center border-2 border-transparent focus:border-slate-200 pl-2 ${className}`}
          />
          <View className="absolute right-2 top-1 bottom-1 flex items-center justify-center">
            {rightAccessory?.({ value })}
          </View>
        </View>
      );
    }
  )
);

export default Input;
