import type { SpaceProfile } from '@/types/bio'

const img = (name: string) => `/images/jeff/${name}`

export const jeffProfile: SpaceProfile = {
  user: {
    username: 'jeff',
    nickname: 'Jeffrey Chen',
    description: '积累一个又一个的瞬间',
    avatar: img('avatar.png'),
  },
  blocks: [
    {
      id: 'title-me',
      type: 'title',
      layout: { x: 0, y: 0, w: 8, h: 1 },
      content: { text: 'Me' },
    },
    {
      id: 'afdian',
      type: 'website',
      layout: { x: 0, y: 1, w: 2, h: 2 },
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
      content: { text: 'Open Source' },
    },
    {
      id: 'github',
      type: 'github',
      layout: { x: 0, y: 4, w: 4, h: 4 },
      content: {},
    },
    {
      id: 'siyuan',
      type: 'website-image',
      layout: { x: 4, y: 4, w: 4, h: 2 },
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
