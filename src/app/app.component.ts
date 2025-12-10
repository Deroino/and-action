import { Component, inject, OnInit, viewChild } from '@angular/core';
import { LoginService } from './core/login.service';
import { AppRouting } from './app-routing';
import { RepositoryFilterService } from './repository-filter.service';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { filter, fromEvent, merge, startWith } from 'rxjs';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { AndActionDataService } from './core/and-action-data.service';
import { ThemeSelectorComponent } from './theme-selector/theme-selector.component';

@Component({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterModule,
    MatSelectModule,
    ThemeSelectorComponent,
  ],
  selector: 'ana-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private sideNav = viewChild.required(MatSidenav);
  protected appRouting = AppRouting;

  protected isFilterToggleButtonActive = false;
  protected isOnline = toSignal(
    merge(fromEvent(window, 'online'), fromEvent(window, 'offline')).pipe(
      startWith(navigator.onLine),
      map(() => navigator.onLine),
    ),
  );

  protected andActionDataService = inject(AndActionDataService);
  protected repositoryFilter = inject(RepositoryFilterService);

  private loginService = inject(LoginService);

  constructor() {
    const router = inject(Router);
    router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => {
        this.sideNav().close();
      });

    // 初始化主题服务
    this.andActionDataService.initSelectedTheme();
  }

  ngOnInit() {
    const { code, state } = this.getUrlParams(window.location.href);
    if (code) {
      this.loginService
        .initAccessTokenFromCode(code, state)
        .subscribe(
          () =>
            (window.location.href = `${window.location.protocol}//${window.location.host}/#/${AppRouting.DASHBOARD}`),
        );
    }
  }

  toggleMobileRepositoryFilterForm() {
    this.isFilterToggleButtonActive = !this.isFilterToggleButtonActive;
    if (!this.isFilterToggleButtonActive) {
      this.repositoryFilter.setValue('');
    }
  }

  protected logout() {
    this.loginService.logout();
  }

  private getUrlParams(url: string) {
    const start = url.indexOf('?') + 1;
    const end =
      url.includes('#') && url.indexOf('#') > start
        ? url.indexOf('#')
        : url.length;

    const pairsArray = url.includes('?')
      ? url.slice(start, end).split('&')
      : [];

    return pairsArray.reduce((cum, pair) => {
      const [key, val] = pair.split('=');
      cum[key] = decodeURIComponent(val);
      return cum;
    }, {} as any);
  }
}
