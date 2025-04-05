# GitHub to GitLab Terminology Chrome Extension

This Chrome extension changes GitHub's Pull Request (PR) terminology to GitLab's Merge Request
(MR) terminology when browsing GitHub.

## Features

- Replaces "Pull Request" with "Merge Request" etc
- Replaces "PR" with "MR"
- Works across GitHub pages
- Updates dynamically as content changes
- Optional popup to enable/disable the extension

## Installation

1. Clone or download this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the extension directory

## How It Works

The extension uses content scripts to replace PR terminology with MR terminology in text nodes
and attributes of elements on GitHub pages. It also uses a MutationObserver to handle dynamic
content changes.


## Known bugs

None

## Unknown Bugs

Perhaps many.


## Caveats

Many. My browser-extension- and JS- fu is subpar and the text replacements could be more
modular. Oh well.

## Roadmap

Rewrite it in Rust.


## Contributing

This is mostly a fun/joke project. I can't promise responsiveness or maintenance. I barely use it
myself — but who knows, it might grow on me.

## License

MIT