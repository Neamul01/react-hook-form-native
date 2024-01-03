import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  StyleSheet,
} from "react-native";
import { useForm, FormProvider } from "react-hook-form";

type FormData = {
  age: string;
  service: string;
};

type StepThreeProps = {
  onSubmit: (data: FormData) => void;
  onBack: () => void;
  defaultValues: FormData;
};

const StepThree: React.FC<StepThreeProps> = ({
  onSubmit,
  onBack,
  defaultValues,
}) => {
  const methods = useForm<FormData>({ defaultValues });
  const [selectedService, setSelectedService] = useState<string>(
    defaultValues.service || ""
  );

  const servicesList = [
    "Web Development",
    "App Development" /* ... 6 more options */,
  ];

  const finalSubmit = (data: FormData) =>
    onSubmit({ ...data, service: selectedService });

  return (
    <FormProvider {...methods}>
      <View style={styles.container}>
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          defaultValue={methods.watch("age")}
          {...methods.register("age")}
        />

        <Text style={styles.label}>Select a Service</Text>
        {servicesList.map((service) => (
          <TouchableOpacity
            key={service}
            onPress={() => setSelectedService(service)}
            style={[styles.serviceOption, { padding: 8 }]}
          >
            <Text>
              {selectedService === service ? "[Selected] " : ""}
              {service}
            </Text>
          </TouchableOpacity>
        ))}

        <View
          style={{
            flexDirection: "column",
            gap: 10,
          }}
        >
          <Button title="Back" onPress={onBack} />
          <Button title="Submit" onPress={methods.handleSubmit(finalSubmit)} />
        </View>
      </View>
    </FormProvider>
  );
};

export default StepThree;

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
  serviceOption: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
  },
});
