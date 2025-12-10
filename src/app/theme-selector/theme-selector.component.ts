import { Component, inject, Renderer2, OnDestroy, OnInit } from '@angular/core';
import { AndActionDataService, AndActionTheme } from '../core/and-action-data.service';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ana-theme-selector',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatIconModule],
  templateUrl: './theme-selector.component.html',
  styleUrl: './theme-selector.component.scss',
})
export class ThemeSelectorComponent implements OnInit, OnDestroy {
  protected dataService = inject(AndActionDataService);
  private renderer = inject(Renderer2);
  private systemThemeMatcher = window.matchMedia('(prefers-color-scheme: dark)');
  private appliedTheme?: AndActionTheme;
  private readonly systemThemeListener = (_event: MediaQueryListEvent) => {
    if (this.selectedTheme === AndActionTheme.AUTO_THEME) {
      this.applyTheme(AndActionTheme.AUTO_THEME);
    }
  };
  protected themes = [
    { value: AndActionTheme.AUTO_THEME, label: 'Auto', icon: 'contrast' },
    { value: AndActionTheme.LIGHT_THEME, label: 'Light', icon: 'light_mode' },
    { value: AndActionTheme.DARK_THEME, label: 'Dark', icon: 'dark_mode' },
    { value: AndActionTheme.NEON_GLOW, label: 'Neon Glow', icon: 'bolt' },
    { value: AndActionTheme.CYBERPUNK, label: 'Cyberpunk', icon: 'code' },
    { value: AndActionTheme.AURORA, label: 'Aurora', icon: 'auto_awesome' },
    { value: AndActionTheme.MATRIX, label: 'Matrix', icon: 'grid_on' },
  ];

  get selectedTheme() {
    return this.dataService.selectedTheme;
  }

  ngOnInit() {
    // 初始化时设置主题类
    this.applyTheme(this.dataService.selectedTheme);
    this.systemThemeMatcher.addEventListener('change', this.systemThemeListener);
  }

  ngOnDestroy() {
    this.systemThemeMatcher.removeEventListener('change', this.systemThemeListener);
  }

  onThemeChange(theme: AndActionTheme) {
    this.dataService.selectedTheme = theme;
    this.applyTheme(theme);
  }

  protected getThemeIcon(themeValue: AndActionTheme): string {
    return this.themes.find(t => t.value === themeValue)?.icon || 'palette';
  }

  protected getThemeLabel(themeValue: AndActionTheme): string {
    return this.themes.find(t => t.value === themeValue)?.label || 'Unknown';
  }

  private applyTheme(theme: AndActionTheme) {
    if (this.appliedTheme) {
      this.renderer.removeClass(document.body, this.appliedTheme);
    }

    this.renderer.removeClass(document.body, AndActionTheme.AUTO_THEME);

    const resolvedTheme =
      theme === AndActionTheme.AUTO_THEME
        ? this.systemThemeMatcher.matches
          ? AndActionTheme.DARK_THEME
          : AndActionTheme.LIGHT_THEME
        : theme;

    if (theme === AndActionTheme.AUTO_THEME) {
      this.renderer.addClass(document.body, AndActionTheme.AUTO_THEME);
    }

    this.renderer.addClass(document.body, resolvedTheme);
    this.appliedTheme = resolvedTheme;
  }
}
