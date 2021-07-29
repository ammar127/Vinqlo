import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, UserType } from './core';
import { LayoutComponent } from './layout/layout.component';
import { NgxPermissionsGuard } from 'ngx-permissions';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [

      {
        path: 'feed',
        loadChildren: () =>
          import('./pages/feed/feed.module').then((m) => m.FeedModule),
          canActivate: [NgxPermissionsGuard],
          data: {
            permissions: {
              only: UserType.user.toString(),
             redirectTo: '/access-denied'
            }
          },
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./pages/profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'community',
        loadChildren: () =>
          import('./pages/community/community.module').then(
            (m) => m.CommunityModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./pages/users/users.module').then((m) => m.UsersModule),
          canActivate: [NgxPermissionsGuard],
          data: {
            permissions: {
              only: [UserType.admin.toString(), UserType.superAdmin.toString()],
              redirectTo: '/access-denied'
            }
          },
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./pages/reports/reports.module').then((m) => m.ReportsModule),
      },
      {
        path: 'academic-category',
        loadChildren: () =>
          import('./pages/academic-category/academic-category.module').then(
            (m) => m.AcademicCategoryModule),
      },
      {
        path: 'category/:slug',
        loadChildren: () =>
          import('./pages/category/category.module').then(
            (m) => m.CategoryModule),
      },
      {
        path: 'post/:slug',
        loadChildren: () =>
          import('./pages/post/post.module').then((m) => m.PostModule),
      },
  { path: 'access-denied', loadChildren: () => import('./pages/access-denied/access-denied.module').then(m => m.AccessDeniedModule) },

      {
        path: '',
        redirectTo: 'feed',
        pathMatch: 'full'
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
