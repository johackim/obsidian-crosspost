import fs from 'fs';
import Twitter from '../src/channels/twitter';

const config = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
const client = Twitter.createClient(config.twitter);

test('Should send a tweet', async () => {
    const text = 'Hello world from Obsidian!';

    const tweet = await Twitter.tweet(text, client);

    expect(tweet).toBe(text);
});

test('Should send a tweet with an image', async () => {
    const text = 'Hello world from Obsidian! https://i.imgur.com/vlyZImE.gif';

    const tweet = await Twitter.tweet(text, client);

    expect(tweet).toContain('Hello world from Obsidian!');
    expect(tweet).toContain('https://t.co/');
    expect(tweet).not.toContain('https://i.imgur.com/vlyZImE.gif');
}, 10000);

test('Should return user infos', async () => {
    const { avatar } = await Twitter.infos('_johackim', client);

    expect(avatar).toBe('https://pbs.twimg.com/profile_images/1585214651582889985/wXGcEffA_normal.jpg');
});
