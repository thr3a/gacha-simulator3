import '@mantine/core/styles.css';
import { Anchor, Container, MantineProvider, Title } from '@mantine/core';
import { GachaForm } from './main/Form';
import { theme } from './theme';
export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Container>
        <Anchor href='/'>
          <Title mt={'md'} order={2}>
            ガチャシュミレーター
          </Title>
        </Anchor>

        <Title order={6} mb={'md'} c={'dimmed'}>
          スマホゲームなどのガチャ確率計算ツール
        </Title>

        <GachaForm />
      </Container>
    </MantineProvider>
  );
}
