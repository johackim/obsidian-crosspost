import fs from 'fs';
import Twitter from '../src/channels/twitter';

test.skip('Should send a tweet', async () => {
    const text = 'Hello world from Obsidian!';

    const tweet = await Twitter.tweet(text);

    expect(tweet).toBe(text);
});

test('Should return user infos', async () => {
    const config = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
    const client = Twitter.createClient(config.twitter);
    const { avatar } = await Twitter.infos('_johackim', client);

    expect(avatar).toBe('https://pbs.twimg.com/profile_images/1585214651582889985/wXGcEffA_normal.jpg');
});
