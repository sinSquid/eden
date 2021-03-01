const keysCols = [
  { key: 'key', label: 'Key', width: 100 },
  { key: 'action', label: 'Action', width: 260 },
];

const supportCols = [
  {
    key: 'type', label: 'Type', width: 100, fixed: 'left',
  },
  { key: 'maintainer', label: 'Maintainer', width: 160 },
  { key: 'link', label: 'Link', width: 260 },
];

const browsers = [
  { key: 'Safari', version: '' },
  { key: 'Mobile Safari', version: '1' },
  { key: 'Firefox', version: '' },
  { key: 'Chrome', version: '' },
  { key: 'Opera', version: '' },
  { key: 'Edge', version: '' },
  { key: 'IE11', version: '3' },
  { key: 'IE10', version: '23' },
];

const keyMap = [
  { key: '0 to 9', action: 'Seek from 0 to 90% respectively' },
  { key: 'space/K', action: 'Toggle playback' },
  { key: '←', action: 'Seek backward by the seekTime option' },
  { key: '→', action: 'Seek forward by the seekTime option' },
  { key: '↑', action: 'Increase volume' },
  { key: '↓', action: 'Decrease volume' },
  { key: 'M', action: 'Toggle mute' },
  { key: 'F', action: 'Toggle fullscreen' },
  { key: 'C', action: 'Toggle captions' },
  { key: 'L', action: 'Toggle loop' },
];

const support = [
  { type: 'WordPress', maintainer: 'Brandon Lavigne', link: 'https://wordpress.org/plugins/plyr/' },
  { type: 'Angular', maintainer: 'Simon Bobrov', link: 'https://github.com/smnbbrv/ngx-plyr' },
  { type: 'React', maintainer: 'Jose Miguel', link: 'https://github.com/xDae/react-plyr' },
  { type: 'Vue', maintainer: 'Gabe Dunn', link: 'https://github.com/redxtech/vue-plyr' },
  { type: 'Neos', maintainer: 'Jon Uhlmann', link: 'https://packagist.org/packages/jonnitto/plyr' },
  { type: 'Kirby', maintainer: 'Dominik Pschenitschni', link: 'https://github.com/dpschen/kirby-plyrtag' },
];

export {
  keysCols,
  supportCols,
  browsers,
  keyMap,
  support,
};
