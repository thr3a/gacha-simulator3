import { Box, Stack } from '@mantine/core';
import { createFormContext } from '@mantine/form';
import { useEffect } from 'react';
import { AttemptsInput } from './AttemptsInput';
import { ProbInput } from './ProbInput';
import { Result } from './Result';
import { ShareButton } from './ShareButton';

const TITLE = 'ガチャシミュレーター';

type GachaFormProps = {
  prob: number;
  attempts: number;
};

export const PROB_PRESETS = [
  0.1, 0.2, 0.25, 0.3, 0.333, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8, 0.9, 1, 1.2, 1.666, 2, 3, 4, 5, 6, 10
];

export const [FormProvider, useFormContext, useForm] = createFormContext<GachaFormProps>();

export function GachaForm() {
  const form = useForm({
    initialValues: {
      prob: 1,
      attempts: 30
    }
  });

  useEffect(() => {
    try {
      // adsbygoogle は AdSense スクリプトが window に追加するグローバル変数のため
      // unknown 経由でキャストして型安全にアクセスする
      const w = window as unknown as Record<string, unknown[]>;
      w.adsbygoogle = w.adsbygoogle || [];
      w.adsbygoogle.push({});
    } catch (_e) {
      // 広告ブロック等で失敗しても無視
    }
  }, []);

  return (
    <FormProvider form={form}>
      <Stack>
        <ProbInput />
        <AttemptsInput />
        {/* ads */}
        <Box ta='center'>
          <ins
            className='adsbygoogle'
            style={{ display: 'block' }}
            data-ad-client='ca-pub-4713051297575097'
            data-ad-slot='9918607879'
            data-ad-format='auto'
            data-full-width-responsive='true'
          />
        </Box>
        <Result />

        {/* シェアボタン */}
        <Box ta='center' py='lg'>
          <ShareButton title={TITLE} />
        </Box>
      </Stack>
    </FormProvider>
  );
}
