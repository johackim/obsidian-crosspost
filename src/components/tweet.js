import React from 'react';

const Tweet = ({ avatar, username, name, content, className }) => (
    <div className={className}>
        <div style={{ display: 'flex' }}>
            <img style={{ marginRight: '0.5rem', borderRadius: '9999px' }} src={avatar} alt={name} width="48" height="48" />
            <div>
                <p style={{ fontWeight: 700, margin: 0 }}>{name}</p>
                <p style={{ color: '#6B7280', fontSize: '0.875rem', lineHeight: '1.25rem', margin: 0 }}>{`@${username}`}</p>
            </div>
        </div>
        <p style={{ marginTop: '0.5rem' }}>{content}</p>
    </div>
);

Tweet.defaultProps = {
    avatar: 'https://i.imgur.com/7DmYAtZ.png',
    username: 'johndoe',
    name: 'John Doe',
    content: 'Consectetur numquam porro fuga et vitae Hic numquam natus quia laborum quaerat consequatur impedit Soluta possimus sequi amet eius ratione? Officia maxime sit atque vel ipsam fuga. Corporis dignissimos incidunt',
    className: '',
};

export default Tweet;
