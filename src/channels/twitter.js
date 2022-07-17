import { TwitterApi } from 'twitter-api-v2';

const createClient = (config) => new TwitterApi(config);

const tweet = async (content, client) => {
    const { data } = await client.v2.tweet(content);
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
