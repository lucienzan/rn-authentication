import { Button, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native";
import { FormSchema, ValidationForm } from "./validationSchema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

  console.log(errors);  // Log errors for debugging

  return (
    <View>
      <Text>Email</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Enter your email"
          />
        )}
      />
      {errors.email && <Text>{errors.email.message}</Text>}

      <Text>Password</Text>
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
      {errors.password && <Text>{errors.password.message}</Text>}

      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};
