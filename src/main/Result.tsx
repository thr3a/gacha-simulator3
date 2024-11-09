import { List, Space, Table, Text } from '@mantine/core';
import { roundDecimal } from 'decimal-utils';
import { useFormContext } from './Form';
import { ResultChart } from './ResultChart';
import { Gacha } from './utils';
// const ResultChart = dynamic(async () => await import('@/features/form/ResultChart'), { ssr: false });

const formatProb = (prob: number): string => {
  return `${roundDecimal(prob * 100, 2)}%`;
};

export const Result = (): JSX.Element => {
  const form = useFormContext();
  const gacha = new Gacha({ prob: form.values.prob, count: form.values.attempts });
  if (!form.isValid()) {
    return <></>;
  }

  const rows = [0, 1, 2, 3, 4, 5].map((hit, index) => (
    <Table.Tr key={index}>
      <Table.Td>{hit}</Table.Td>
      <Table.Td>{formatProb(gacha.SuccessProbByHit(hit))}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <List spacing={4} mb={'sm'} center>
        <List.Item>
          <Text fz='xl'>
            1回以上当たる確率は
            <Text component='span' fw={'bold'} c={'red'}>
              {formatProb(gacha.anySuccessProb())}
            </Text>
          </Text>
        </List.Item>
        <List.Item mb={'sm'}>
          <Text fz='xl'>
            全て外れる確率は
            <Text component='span' fw={'bold'}>
              {formatProb(gacha.allFailProb())}
            </Text>
          </Text>
        </List.Item>
        {[50, 70, 95].map((threshold, index) => (
          <List.Item key={index}>
            {threshold}%の人は
            <Text component='span' fw={'bold'}>
              {gacha.anySuccessCount(threshold)}
            </Text>
            回やれば1回は当たる
          </List.Item>
        ))}
        <List.Item>
          1%の人は
          <Text component='span' fw={'bold'} c={'red'}>
            {gacha.anySuccessCount(99)}
          </Text>
          回やっても全て外れる🤪
        </List.Item>
      </List>

      <Space h={'md'} />

      <ResultChart
        data={[0, 1, 2, 3, 4, 5].map((hit) => ({
          count: hit,
          prob: roundDecimal(gacha.SuccessProbByHit(hit) * 100, 2)
        }))}
      />

      <Table stickyHeader stickyHeaderOffset={60} striped withTableBorder withColumnBorders withRowBorders={false}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>当たる回数</Table.Th>
            <Table.Th>確率</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
};
