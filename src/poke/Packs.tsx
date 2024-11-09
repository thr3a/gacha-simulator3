import { Box, Select } from '@mantine/core';
import { useFormContext } from './Form';

export const Packs = (): JSX.Element => {
  const form = useFormContext();

  const packList = (): string[] => {
    const list = [];
    for (let i = 1; i <= 30; i++) {
      list.push(i.toString());
    }
    for (let i = 4; i <= 10; i++) {
      list.push((i * 10).toString());
    }
    return list;
  };

  return (
    <Box>
      <Select {...form.getInputProps('packs')} label='開封するパック数' data={packList()} />
    </Box>
  );
};
