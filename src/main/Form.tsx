import { Box, Space } from '@mantine/core';
import { createFormContext } from '@mantine/form';
import { AttemptsInput } from './AttemptsInput';
import { ProbInput } from './ProbInput';
import { Result } from './Result';

type GachaFormProps = {
  prob: number;
  attempts: number;
};

export const PROB_PRESETS = [
  0.1, 0.2, 0.25, 0.3, 0.333, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8, 0.9, 1, 1.2, 1.666, 2, 3, 4, 5, 6, 10
];

export const [FormProvider, useFormContext, useForm] = createFormContext<GachaFormProps>();

export function GachaForm() {
  const form = useForm({
    initialValues: {
      prob: 1,
      attempts: 30
    }
  });

  return (
    <FormProvider form={form}>
      <Box mx='auto' component='form' maw={400}>
        <ProbInput />
        <Space h='md' />
        <AttemptsInput />
        <Space h='md' />
        <Result />
      </Box>
    </FormProvider>
  );
}
