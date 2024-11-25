import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FormSchema, ValidationForm } from "./validationSchema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import navigationService from "../../../routes/navigationService";

type Props = {
  defaultValue?: ValidationForm;
  mode: number;
  onSubmit: (data: ValidationForm) => void;
};

export const AuthForm: React.FC<Props> = ({ mode, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationForm>({
    resolver: zodResolver(FormSchema),
  });

  const handleRegisterNavigation = () => {
    navigationService.navigate("Register");
  };

  return (
    <View className="h-full w-full ps-4 pe-4 flex justify-around pt-20">
      <KeyboardAvoidingView behavior="padding">
        <View className="pb-4">
          <Text className="pb-1">Email</Text>
          <View className="rounded-2xl w-full bg-black/5 p-5">
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className=""
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your email"
                />
              )}
            />
          </View>
          {errors.email && (
            <Text className="text-red-500">{errors.email.message}</Text>
          )}
        </View>
        <View className="pb-4">
          <Text className="pb-1">Password</Text>
          <View className="rounded-2xl w-full bg-black/5 p-5">
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your password"
                />
              )}
            />
          </View>
          {errors.password && (
            <Text className="text-red-500">{errors.password.message}</Text>
          )}
        </View>
        <TouchableOpacity
          className=" bg-purple-400 p-4 rounded-2xl"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-center font-bold text-white">
            {mode == 1 ? "Sign In" : "Sign Up"}
          </Text>
        </TouchableOpacity>
        {mode == 1 ? (
          <View className="flex-row gap-2 self-center pt-5">
            <Text>Do not have an account?</Text>
            <TouchableOpacity onPress={handleRegisterNavigation}>
              <Text className="text-purple-400 font-semibold">Sign Up</Text>
            </TouchableOpacity>
          </View>
        ) : undefined}
      </KeyboardAvoidingView>
    </View>
  );
};
