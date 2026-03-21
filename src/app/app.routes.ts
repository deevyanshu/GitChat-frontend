import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', loadComponent: () => import('./pages/welcome/welcome').then(m => m.Welcome)
    },
    {
        path: 'home', redirectTo: '', pathMatch: 'full'
    },
    {
        path: 'repo', loadComponent: () => import('./pages/repo/repo').then(m => m.Repo)
    },
    {
        path: 'chat', loadComponent: () => import('./pages/chat/chat').then(m => m.Chat)
    }
];
