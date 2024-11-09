import { List, Space, Table, Text } from '@mantine/core';
import { roundDecimal } from 'decimal-utils';
import { useFormContext } from './Form';
// import { ResultChart } from './ResultChart';
import { PokeGacha, type Rarity } from './utils';

const formatProb = (prob: number): string => {
  return `${roundDecimal(prob * 100, 2)}%`;
};

export function Result(): JSX.Element {
  const form = useFormContext();
  const gacha = new PokeGacha(form.values.rarity as Rarity, Number(form.values.packs));
  if (!form.isValid()) {
    return <></>;
  }

  const rows = [0, 1, 2, 3, 4, 5].map((hit, index) => (
    <Table.Tr key={index}>
      <Table.Td>{hit}</Table.Td>
      <Table.Td>{formatProb(gacha.getExactlyXProbability(hit, form.values.isSpecific))}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <List spacing={4} mb={'sm'} center>
        <List.Item>
          <Text fz='xl'>
            1回以上当たる確率は
            <Text component='span' fw={'bold'} c={'red'}>
              {formatProb(gacha.getAtLeastOneProbability(form.values.isSpecific))}
            </Text>
          </Text>
        </List.Item>
        <List.Item mb={'sm'}>
          <Text fz='xl'>
            全て外れる確率は
            <Text component='span' fw={'bold'}>
              {formatProb(gacha.getZeroProbability(form.values.isSpecific))}
            </Text>
          </Text>
        </List.Item>
        {[50, 70, 95].map((threshold, index) => (
          <List.Item key={index}>
            {threshold}%の人は
            <Text component='span' fw={'bold'}>
              {gacha.getPacksNeededForProbability(threshold, form.values.isSpecific)}
            </Text>
            パック開ければ1回は当たる
          </List.Item>
        ))}
        <List.Item>
          1%の人は
          <Text component='span' fw={'bold'} c={'red'}>
            {gacha.getPacksNeededForProbability(99, form.values.isSpecific)}
          </Text>
          パック開けても全て外れる🤪
        </List.Item>
      </List>

      <Space h={'md'} />

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
}
