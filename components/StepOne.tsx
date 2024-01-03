import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useForm, FormProvider } from "react-hook-form";

type FormData = {
  name: string;
  address: string;
  occupation: string;
  about: string;
};

type StepOneProps = {
  onNext: (data: FormData) => void;
  defaultValues: FormData;
};

const StepOne: React.FC<StepOneProps> = ({ onNext, defaultValues }) => {
  const methods = useForm<FormData>({ defaultValues });
  const onSubmit = (data: FormData) => onNext(data);

  return (
    <FormProvider {...methods}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          fontWeight: "500",
          marginBottom: 20,
        }}
      >
        Step One
      </Text>
      <View style={styles.container}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          defaultValue={methods.watch("name")}
          {...methods.register("name")}
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          defaultValue={methods.watch("address")}
          {...methods.register("address")}
        />

        <Text style={styles.label}>Occupation</Text>
        <TextInput
          style={styles.input}
          defaultValue={methods.watch("occupation")}
          {...methods.register("occupation")}
        />

        <Text style={styles.label}>About</Text>
        <TextInput
          style={styles.input}
          defaultValue={methods.watch("about")}
          {...methods.register("about")}
          multiline
        />

        <Button title="Next" onPress={methods.handleSubmit(onSubmit)} />
      </View>
    </FormProvider>
  );
};

export default StepOne;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    marginBottom: 8,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 20,
    borderRadius: 4,
  },
});
