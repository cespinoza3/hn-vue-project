
export type Story = {
    story_title: String;
    story_url: String | null;
    created_at: String;
    author: String;
    comment_text: String;
    _tags: Array<String>;
}
