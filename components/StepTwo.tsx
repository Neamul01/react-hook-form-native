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
  email: string;
  hobby: string;
  hobbies: string[];
};

type StepTwoProps = {
  onNext: (data: FormData) => void;
  onBack: () => void;
  defaultValues: FormData;
};

const StepTwo: React.FC<StepTwoProps> = ({ onNext, onBack, defaultValues }) => {
  const methods = useForm<FormData>({ defaultValues });
  const [selectedHobby, setSelectedHobby] = useState<string>(
    defaultValues.hobby || ""
  );
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>(
    defaultValues.hobbies || []
  );

  const hobbiesList = ["Hobby1", "Hobby2" /* ... up to 10 */];

  const handleSelectHobby = (hobby: string) => {
    setSelectedHobbies((prev) => {
      if (prev.includes(hobby)) {
        return prev.filter((h) => h !== hobby);
      } else {
        return [...prev, hobby];
      }
    });
  };

  const onSubmit = (data: FormData) =>
    onNext({ ...data, hobby: selectedHobby, hobbies: selectedHobbies });

  return (
    <FormProvider {...methods}>
      <View style={styles.container}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          defaultValue={methods.watch("email")}
          style={styles.input}
          {...methods.register("email")}
        />

        <Text style={styles.radioButtonLabel}>Select Your Hobby</Text>
        {hobbiesList.map((hobby) => (
          <TouchableOpacity
            key={hobby}
            onPress={() => setSelectedHobby(hobby)}
            style={[
              styles.radioButtonContainer,
              { flexDirection: "row", alignItems: "center", padding: 8 },
            ]}
          >
            <Text>{selectedHobby === hobby ? "🔘" : "⚪️"}</Text>
            <Text>{hobby}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.radioButtonLabel}>Select Multiple Hobbies</Text>
        {hobbiesList.map((hobby) => (
          <TouchableOpacity
            key={hobby}
            onPress={() => handleSelectHobby(hobby)}
            style={[
              styles.radioButtonContainer,
              { flexDirection: "row", alignItems: "center", padding: 8 },
            ]}
          >
            <Text>
              {selectedHobbies.includes(hobby) ? "[x]" : "[ ]"} {hobby}
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
          <Button title="Next" onPress={methods.handleSubmit(onSubmit)} />
        </View>
      </View>
    </FormProvider>
  );
};

export default StepTwo;

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
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioButtonLabel: {
    marginLeft: 10,
  },
  // Add more styles as needed
});
