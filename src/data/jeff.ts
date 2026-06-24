import type { SpaceProfile } from '@/types/bio'

const img = (name: string) => `/images/jeff/${name}`

export const jeffProfile: SpaceProfile = {
  user: {
    nickname: 'Jeffrey Chen',
    description: '积累一个又一个的瞬间',
    avatar: img('avatar.png'),
  },
  blocks: [
    {
      id: 'title-me',
      type: 'title',
      layout: { x: 0, y: 0, w: 8, h: 1 },
      theme: { titleAccent: '#ff3d8f' },
      content: { text: 'Me' },
    },
    {
      id: 'afdian',
      type: 'website',
      layout: { x: 0, y: 1, w: 2, h: 2 },
      theme: {
        cardBg: '#ffe5f0',
        cardAccent: '#ff3d8f',
        cardShadow: '#ff3d8f',
        cardDeco: '♥',
        cardTilt: '-1.5deg',
      },
      content: {
        title: '爱发电 (打赏)',
        url: 'afdian.com',
        href: 'https://afdian.com/a/JeffreyChen',
        favicon: img('afdian-favicon.png'),
      },
    },
    {
      id: 'ld246',
      type: 'website',
      layout: { x: 2, y: 1, w: 2, h: 2 },
      theme: {
        cardBg: '#e0fcff',
        cardAccent: '#00e5ff',
        cardShadow: '#00e5ff',
        cardDeco: '◆',
        cardTilt: '1deg',
      },
      content: {
        title: '链滴主页',
        url: 'ld246.com',
        href: 'https://ld246.com/member/JeffreyChen',
        favicon: img('ld246-favicon.jpg'),
      },
    },
    {
      id: 'title-os',
      type: 'title',
      layout: { x: 0, y: 3, w: 8, h: 1 },
      sectionGap: true,
      theme: { titleAccent: '#9b5de5' },
      content: { text: 'Open Source' },
    },
    {
      id: 'github',
      type: 'github',
      layout: { x: 0, y: 4, w: 4, h: 4 },
      theme: {
        cardBg: '#f0ffe0',
        cardAccent: '#bfff00',
        cardShadow: '#bfff00',
        cardDeco: '⌘',
        cardTilt: '0.5deg',
      },
    },
    {
      id: 'siyuan',
      type: 'website-image',
      layout: { x: 4, y: 4, w: 4, h: 2 },
      layoutMobile: { x: 0, y: 8, w: 4, h: 2 },
      theme: {
        cardBg: '#f0e8ff',
        cardAccent: '#9b5de5',
        cardShadow: '#9b5de5',
        cardDeco: '✿',
        cardTilt: '-1deg',
      },
      content: {
        title: 'SiYuan: Note-Taking App',
        url: 'github.com',
        href: 'https://github.com/siyuan-note/siyuan',
        favicon: img('siyuan-favicon.jpg'),
        image: img('siyuan-preview.png'),
      },
    },
    {
      id: 'whisper',
      type: 'website-image',
      layout: { x: 4, y: 6, w: 4, h: 2 },
      layoutMobile: { x: 0, y: 10, w: 4, h: 2 },
      theme: {
        cardBg: '#ffe8d6',
        cardAccent: '#ff6b35',
        cardShadow: '#ff6b35',
        cardDeco: '☆',
        cardTilt: '1.2deg',
      },
      content: {
        title: 'Whisper: a SiYuan theme',
        url: 'github.com',
        href: 'https://github.com/TCOTC/Whisper',
        favicon: img('whisper-favicon.jpg'),
        image: img('whisper-preview.png'),
      },
    },
  ],
}
