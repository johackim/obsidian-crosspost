import { downloadFile } from '../src/utils';

test('Should download a file', async () => {
    const url = 'https://i.imgur.com/vlyZImE.gif';

    const file = await downloadFile(url);

    expect(file).toContain('vlyZImE.gif');
});
