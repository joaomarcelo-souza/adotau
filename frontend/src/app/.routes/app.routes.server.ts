import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'animais/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'profile/animais/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'profile/alterar/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'profile/alterar-user/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
