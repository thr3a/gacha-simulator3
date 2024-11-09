import '@mantine/core/styles.css';
import { Anchor, Container, MantineProvider, Title } from '@mantine/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { GachaForm } from './poke/Form';
import { theme } from './theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <Container>
        <Anchor href='/'>
          <Title mt={'md'} order={2}>
            ポケポケ ガチャシュミレーター
          </Title>
        </Anchor>

        <Title order={6} mb={'md'} c={'dimmed'}>
          スマホゲームなどのガチャ確率計算ツール
        </Title>

        <GachaForm />
      </Container>
    </MantineProvider>
  </React.StrictMode>
);
