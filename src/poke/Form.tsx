import { Box, Space } from '@mantine/core';
import { createFormContext } from '@mantine/form';
import { IsSpecific } from './IsSpecific';
import { Packs } from './Packs';
import { RarityInput } from './RarityInput';
import { Result } from './Result';

export type GachaFormProps = {
  rarity: string;
  packs: string;
  isSpecific: boolean;
};

export const [FormProvider, useFormContext, useForm] = createFormContext<GachaFormProps>();

export function GachaForm() {
  const form = useForm({
    initialValues: {
      rarity: 'd4',
      packs: '1',
      isSpecific: false
    }
  });

  return (
    <FormProvider form={form}>
      <Box mx='auto' component='form' maw={400}>
        <RarityInput />
        <Space h='md' />
        <Packs />
        <Space h='md' />
        <IsSpecific />
        <Space h='md' />
        <Result />
      </Box>
    </FormProvider>
  );
}
