import { ItemView } from 'obsidian'; // eslint-disable-line
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import Tweet from './components/tweet';
import PublishModal from './modal';
import Twitter from './channels/twitter';

import { VIEW_TYPE_REVIEW, ICON_VIEW_NAME } from './constants';

export default class ReviewView extends ItemView {
    constructor(leaf, plugin) {
        super(leaf);
        this.plugin = plugin;
    }

    getViewType() {
        return VIEW_TYPE_REVIEW;
    }

    getDisplayText() {
        return 'Review';
    }

    getIcon() {
        return ICON_VIEW_NAME;
    }

    async onOpen() {
        const container = this.containerEl.children[1];
        container.empty();
        const infos = await Twitter.infos('_johackim', this.plugin.twitterClient);
        const root = createRoot(container);
        const onClick = () => new PublishModal(this.app, this.plugin).open();

        const update = async () => {
            const file = await this.app.workspace.getActiveFile();
            const content = file ? await this.app.vault.cachedRead(file) : false;
            const empty = <div className="pane-empty">No content found.</div>;

            root.render(content ? (
                <div>
                    <Tweet content={content} {...infos} />
                    <button type="button" style={{ width: '100%' }} onClick={onClick}>Publish</button>
                </div>
            ) : empty);
        };

        await update();

        this.registerEvent(this.app.vault.on('modify', update));
        this.registerEvent(this.app.workspace.on('file-open', update));
    }
}
