# CHANGELOG

All notable changes to this project will be documented in this file.

> **Tags**
> - Features
> - Bug Fixes
> - Performance Improvements
> - Dependency Updates
> - Breaking Changes
> - Documentation
> - Internal

## v1.1.7 (2018-06-04)

#### Dependency Updates

* update ng-packagr to v2.4.5 ([dd85ac9](https://github.com/Sibiraj-S/angular-paginator/commit/dd85ac9))
* update @compodoc/compodoc to v1.1.3 ([dd85ac9](https://github.com/Sibiraj-S/angular-paginator/commit/dd85ac9))
* update bootstrap to v4.1.1 ([dd85ac9](https://github.com/Sibiraj-S/angular-paginator/commit/dd85ac9))

## v1.1.6 (2018-06-04)

#### Internal

* remove maintenance badge from README  ([0b3072e](https://github.com/Sibiraj-S/angular-paginator/commit/0b3072e))

## v1.1.5 (2018-03-26)

#### INTERNAL

* update ng-packagr to v2.4.1 ([cfb698e](https://github.com/Sibiraj-S/angular-paginator/commit/cfb698e))
* update devDependencies ([cfb698e](https://github.com/Sibiraj-S/angular-paginator/commit/cfb698e))

## v1.1.4 (2018-02-22)

#### Performance Improvements

* remove comments from final bundles ([5f77ca9](https://github.com/Sibiraj-S/angular-paginator/commit/5f77ca9))

#### Internal

* include LICENSE in the final bundle ([5f77ca9](https://github.com/Sibiraj-S/angular-paginator/commit/5f77ca9))

#### Dependency Updates

* update ng-packagr to v2.1.0 ([5f77ca9](https://github.com/Sibiraj-S/angular-paginator/commit/5f77ca9))

## v1.1.3 (2018-02-07)

#### Internal

* remove `type-of-compare` from `tslint.json` ([e12d8f2](https://github.com/Sibiraj-S/angular-paginator/commit/e12d8f2))

#### Dependency Updates

* update ng-packagr to v2.0.0 ([e12d8f2](https://github.com/Sibiraj-S/angular-paginator/commit/e12d8f2))
* update versions in peerDependencies ([e12d8f2](https://github.com/Sibiraj-S/angular-paginator/commit/e12d8f2))
* update angular-cli to 1.6.7 ([e12d8f2](https://github.com/Sibiraj-S/angular-paginator/commit/e12d8f2))

## v1.1.2 (2018-01-22)

#### Dependency Updates

* update bootstrap to stable version

## v1.1.1 (2018-01-05)

#### Dependency Updates

* update angular-cli

#### Documentation

* docs auto-generated using [compodoc](https://compodoc.github.io/website/)

## v1.1.0 (2017-12-07)

#### Features

* feat: option to disable angular-paginator ([b78b3f1](https://github.com/Sibiraj-S/angular-paginator/commit/b78b3f1))

#### Breaking Changes

* property `size` removed. Use `className` instead for passing [bootstrap-pagination-sizes](https://getbootstrap.com/docs/4.0/components/pagination/#sizing) ([15b8954](https://github.com/Sibiraj-S/angular-paginator/commit/15b8954))

## v1.0.2 (2017-12-01)

#### Performance Improvements

* implement changeDetectionStrategy for better performance ([b41a9242](https://github.com/Sibiraj-S/angular-paginator/commit/b41a9242))

#### Bug Fixes

* currentPage not set on page load ([b41a9242](https://github.com/Sibiraj-S/angular-paginator/commit/b41a9242))

## v1.0.1 (2017-11-30)

#### Dependency Updates

* update to @angular/cli to v1.5.5 ([d303b82](https://github.com/Sibiraj-S/angular-paginator/commit/d303b82))
* move dependencies to peerDependency ([d303b82](https://github.com/Sibiraj-S/angular-paginator/commit/d303b82))

## v1.0.0 (2017-11-23)

#### Dependency Updates

* update to @angular/cli to v1.5.4 ([c0abeb7](https://github.com/Sibiraj-S/angular-paginator/commit/c0abeb7))

## v1.0.0-rc.3 (2017-11-23)

#### Performance Improvements

* prevent setCurrentPage called twice ([7a99c0e](https://github.com/Sibiraj-S/angular-paginator/commit/7a99c0e))

## v1.0.0-rc.2 (2017-11-22)

#### Bug Fixes

* currentPage not set on Page load ([f1302e4](https://github.com/Sibiraj-S/angular-paginator/commit/f1302e4))

#### Performance Improvements

* use asynchronous EventEmitter ([0582876](https://github.com/Sibiraj-S/angular-paginator/commit/0582876))
* cleanup scripts ([893d271](https://github.com/Sibiraj-S/angular-paginator/commit/893d271))

## v1.0.0-rc.1 (2017-11-21)

#### Dependency Updates

* update to @angular/cli to v1.5.3 fixes a vulnerability warning while using older version of handlebars ([6a0e9da](https://github.com/Sibiraj-S/angular-paginator/commit/6a0e9da))

## v1.0.0-rc.0 (2017-11-15)

#### Bug Fixes

* fix: setCurrentPage is called twice ([5d2dbad](https://github.com/Sibiraj-S/angular-paginator/commit/5d2dbad))

#### Performance Improvements

* don't call setCurrentPage, if page is active ([bb5a0b9](https://github.com/Sibiraj-S/angular-paginator/commit/bb5a0b9))

#### Dependency Updates

* update ng-packagr to v1.6.0 ([1724191](https://github.com/Sibiraj-S/angular-paginator/commit/1724191))

## v1.0.0-beta.3 (2017-11-13)

#### Bug Fixes

* fix: bootstrap theme not applied ([4cadb62](https://github.com/Sibiraj-S/angular-paginator/commit/4cadb62))

#### Features

* autohide pagination controls if pagination items is less than itemsPerPage ([848de31](https://github.com/Sibiraj-S/angular-paginator/commit/848de31))
* support screen-readers ([bd58038](https://github.com/Sibiraj-S/angular-paginator/commit/bd58038))

#### Performance Improvements

* use `ng-container` to avoid interference in HTML layout  ([6f25cce](https://github.com/Sibiraj-S/angular-paginator/commit/6f25cce))

#### Breaking Changes

* input `class` is renamed to `className` ([0664390](https://github.com/Sibiraj-S/angular-paginator/commit/0664390))

## v1.0.0-beta.2 (2017-11-08)

#### Bug Fixes

* fix: default configuration is not set if configuration is not provided in pipe ([9091805](https://github.com/Sibiraj-S/angular-paginator/commit/9091805))

## v1.0.0-beta.1 (2017-11-07)

#### Bug Fixes

* fix redirection while navigating through pages ([bcfdec0](https://github.com/Sibiraj-S/angular-paginator/commit/bcfdec0))
* fix returning undefined class for pagination size ([6aa8723](https://github.com/Sibiraj-S/angular-paginator/commit/6aa8723))

## v1.0.0-beta.0 (2017-11-07)

Initial Release. Pagination Component for Angular application using bootstrap styles
