import { Button, Group, TextInput } from '@mantine/core';
// import { useEffect } from 'react';
import { PROB_PRESETS, useFormContext } from './Form';

export const ProbInput = (): JSX.Element => {
  const form = useFormContext();

  const setProb = (prob: number): void => {
    form.setFieldValue('prob', prob);
  };

  return (
    <>
      <TextInput label='当たりの出現率' {...form.getInputProps('prob')} rightSection={'%'} />
      <Group gap={0.5}>
        {PROB_PRESETS.map((prob, index) => (
          <Button
            p={'xs'}
            // sx={(theme) => ({
            //   padding: theme.spacing.xs
            // })}
            key={index}
            variant='outline'
            onClick={() => {
              setProb(prob);
            }}
          >
            {prob}
          </Button>
        ))}
      </Group>
    </>
  );
};
