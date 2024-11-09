import { Bar, BarChart, CartesianGrid, Label, Tooltip, XAxis, YAxis } from 'recharts';

type chartDataProps = {
  data: Array<{
    count: number;
    prob: number;
  }>;
};

export function ResultChart({ data }: chartDataProps): JSX.Element {
  return (
    <BarChart width={350} height={300} data={data} margin={{ top: 0, right: 0, left: 5, bottom: 0 }}>
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='count' unit='回'>
        {/* <Label value="回数" offset={-10} position={'insideBottom'} /> */}
      </XAxis>
      <YAxis dataKey='prob' unit='%' domain={[0, 100]}>
        <Label value='確率' angle={-90} position={'insideLeft'} />
      </YAxis>
      <Tooltip />
      <Bar dataKey='prob' fill='#1C7ED6' label={{ position: 'top', fill: 'dark' }} />
    </BarChart>
  );
}
