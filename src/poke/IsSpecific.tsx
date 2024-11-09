import { Box, Checkbox } from '@mantine/core';
import { useFormContext } from './Form';

export const IsSpecific = (): JSX.Element => {
  const form = useFormContext();

  return (
    <Box>
      <Checkbox label='特定のカードを当てたい' {...form.getInputProps('isSpecific')} />
    </Box>
  );
};
