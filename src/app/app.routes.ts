import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },
    {
        path: 'home', loadComponent: () => import('./pages/welcome/welcome').then(m => m.Welcome)
    },
    {
        path: 'repo', loadComponent: () => import('./pages/repo/repo').then(m => m.Repo)
    },
    {
        path: 'chat', loadComponent: () => import('./pages/chat/chat').then(m => m.Chat)
    }
];
