import { Injectable, Pipe, PipeTransform } from '@angular/core';
import {
  I18NEXT_SERVICE,
  I18NextLoadResult,
  ITranslationEvents,
  ITranslationService
} from 'angular-i18next';
import { BehaviorSubject, Subject } from 'rxjs';
import { NgModuleMetadata } from '@storybook/angular/dist/client/preview/types';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { moduleMetadata } from '@storybook/angular';

// noinspection AngularMissingOrInvalidDeclarationInModule
@Pipe({ name: 'i18next', pure: true })
export class I18NextPipe implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

@Injectable()
export class I18NextService implements ITranslationService {
  events: ITranslationEvents = {
    added: new Subject(),
    loaded: new BehaviorSubject(true),
    initialized: new BehaviorSubject(true),
    languageChanged: new BehaviorSubject('en'),
    failedLoading: new Subject(),
    missingKey: new Subject(),
    removed: new Subject()
  };

  language = 'en';
  languages = ['en'];
  options = {};

  format(value: string): string {
    return value;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addResource(): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addResourceBundle(): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addResources(): void {}

  changeLanguage(): Promise<unknown> {
    return Promise.resolve({});
  }

  dir(): string {
    return '';
  }

  exists(): boolean {
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getFixedT(): void {}

  getResource() {
    return {};
  }

  getResourceBundle() {
    return {};
  }

  hasResourceBundle(): boolean {
    return true;
  }

  init(): Promise<I18NextLoadResult> {
    return Promise.resolve({
      t: key => key,
      err: undefined
    });
  }

  loadNamespaces(): Promise<unknown> {
    return Promise.resolve({});
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  reloadResources(): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeResourceBundle(): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setDefaultNamespace(): void {}

  t(key: string): string {
    return key;
  }

  use(): ITranslationService {
    return this;
  }
}

const COMMON_METADATA: Partial<NgModuleMetadata> = {
  declarations: [I18NextPipe],
  imports: [AngularSvgIconModule.forRoot(), HttpClientModule],
  providers: [
    {
      provide: I18NEXT_SERVICE,
      useClass: I18NextService
    }
  ]
};

export function bookingModule(
  meta?: Partial<NgModuleMetadata>
): NgModuleMetadata {
  if (!meta) {
    return COMMON_METADATA;
  }

  let declarations = COMMON_METADATA.declarations;
  if (meta.declarations) {
    declarations = declarations.concat(meta.declarations);
  }

  let imports = COMMON_METADATA.imports;
  if (meta.imports) {
    imports = imports.concat(meta.imports);
  }

  let providers = COMMON_METADATA.providers;
  if (meta.providers) {
    providers = imports.concat(meta.providers);
  }

  return {
    ...meta,
    declarations,
    imports,
    providers
  };
}

export function bookingModuleDecorator(
  meta?: Partial<NgModuleMetadata>
): (storyFn: () => unknown) => unknown {
  return moduleMetadata(bookingModule(meta));
}
