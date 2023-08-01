import { Routes } from '@angular/router';

//Route for content layout without sidebar, navbar and footer for pages like Login, Registration etc...

export const WEB_ROUTES: Routes = [
    {
        path: 'inicio',
        loadChildren: () => import('./../../website/website.module').then(m => m.WebsiteModule)
    }
    
];
