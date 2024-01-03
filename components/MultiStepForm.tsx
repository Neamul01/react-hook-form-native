import React, { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

type FormData = {
  name: string;
  address: string;
  occupation: string;
  about: string;
  email: string;
  hobby: string;
  hobbies: string[];
  age: string;
  service: string;
};

const MultiStepForm = () => {
  const defaultFormData: FormData = {
    name: "John Doe",
    address: "123 Main St",
    occupation: "Developer",
    about: "About me...",
    email: "john@example.com",
    hobby: "Hobby1",
    hobbies: ["Hobby2", "Hobby3"],
    age: "30",
    service: "Web Development",
  };

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  const nextStep = (data: Partial<FormData>) => {
    setFormData({ ...formData, ...data });
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = (data: Partial<FormData>) => {
    console.log("Final Data:", { ...formData, ...data });
    // Process final data here
  };

  switch (step) {
    case 1:
      return <StepOne onNext={nextStep} defaultValues={formData} />;
    case 2:
      return (
        <StepTwo onNext={nextStep} onBack={prevStep} defaultValues={formData} />
      );
    case 3:
      return (
        <StepThree
          onSubmit={handleSubmit}
          onBack={prevStep}
          defaultValues={formData}
        />
      );
    default:
      return <div />;
  }
};

export default MultiStepForm;
