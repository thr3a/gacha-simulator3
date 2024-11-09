import { Box, Select } from '@mantine/core';
import { useFormContext } from './Form';

export const RarityInput = (): JSX.Element => {
  const form = useFormContext();

  return (
    <Box>
      <Select
        {...form.getInputProps('rarity')}
        label='レアリティ'
        data={[
          { value: 'd1', label: '◇' },
          { value: 'd2', label: '◇◇' },
          { value: 'd3', label: '◇◇◇' },
          { value: 'd4', label: '◇◇◇◇' },
          { value: 's1', label: '☆' },
          { value: 's2', label: '☆☆' },
          { value: 's3', label: '☆☆☆' },
          { value: 'k1', label: '👑' }
        ]}
      />
    </Box>
  );
};
