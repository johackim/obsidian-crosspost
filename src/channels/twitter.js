import { TwitterApi } from 'twitter-api-v2';
import { downloadFile } from '../utils';

const createClient = (config) => new TwitterApi(config);

const tweet = async (text, client) => {
    const [image = false] = text.match(/(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i) || [];
    const file = image ? await downloadFile(image) : false;
    const mediaId = image ? await client.v1.uploadMedia(file) : false;
    const content = text.replace(image, '');

    const { data } = await client.v2.tweet(content, mediaId ? { media: { media_ids: [mediaId] } } : {});

    return data?.text;
};

const infos = async (username, client) => {
    const { data } = await client.v2.userByUsername(username, { 'user.fields': ['profile_image_url'] });

    return {
        id: data.id,
        avatar: data?.profile_image_url,
        name: data?.name,
        username: data?.username,
    };
};

export default { createClient, tweet, infos };
