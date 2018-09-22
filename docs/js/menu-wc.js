'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`<nav>
    <ul class="list">
        <li class="title">
            <a href="index.html" data-type="index-link">Angular Paginator</a>
        </li>
        <li class="divider"></li>
        ${ isNormalMode ? `<div id="book-search-input" role="search">
    <input type="text" placeholder="Type to search">
</div>
` : '' }
        <li class="chapter">
            <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
            <ul class="links">
                    <li class="link">
                        <a href="overview.html" data-type="chapter-link">
                            <span class="icon ion-ios-keypad"></span>Overview
                        </a>
                    </li>
                    <li class="link">
                        <a href="index.html" data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>README
                        </a>
                    </li>
                    <li class="link">
                            <a href="changelog.html"
                        data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>CHANGELOG
                        </a>
                    </li>
                    <li class="link">
                            <a href="license.html"
                        data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>LICENSE
                        </a>
                    </li>
                    <li class="link">
                        <a href="dependencies.html"
                            data-type="chapter-link">
                            <span class="icon ion-ios-list"></span>Dependencies
                        </a>
                    </li>
            </ul>
        </li>
        <li class="chapter modules">
            <a data-type="chapter-link" href="modules.html">
                <div class="menu-toggler linked" data-toggle="collapse"
                    ${ isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                    <span class="icon ion-ios-archive"></span>
                    <span class="link-name">Modules</span>
                    <span class="icon ion-ios-arrow-down"></span>
                </div>
            </a>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                    <li class="link">
                        <a href="modules/AngularPaginatorModule.html" data-type="entity-link">AngularPaginatorModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AngularPaginatorModule-81bf3d5af84a1b6af153bc508071e6ef"' : 'data-target="#xs-components-links-module-AngularPaginatorModule-81bf3d5af84a1b6af153bc508071e6ef"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AngularPaginatorModule-81bf3d5af84a1b6af153bc508071e6ef"' : 'id="xs-components-links-module-AngularPaginatorModule-81bf3d5af84a1b6af153bc508071e6ef"' }>
                                        <li class="link">
                                            <a href="components/AngularPaginatorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AngularPaginatorComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#directives-links-module-AngularPaginatorModule-81bf3d5af84a1b6af153bc508071e6ef"' : 'data-target="#xs-directives-links-module-AngularPaginatorModule-81bf3d5af84a1b6af153bc508071e6ef"' }>
                                    <span class="icon ion-md-code-working"></span>
                                    <span>Directives</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="directives-links-module-AngularPaginatorModule-81bf3d5af84a1b6af153bc508071e6ef"' : 'id="xs-directives-links-module-AngularPaginatorModule-81bf3d5af84a1b6af153bc508071e6ef"' }>
                                        <li class="link">
                                            <a href="directives/AngularPaginatorDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AngularPaginatorDirective</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-AngularPaginatorModule-81bf3d5af84a1b6af153bc508071e6ef"' : 'data-target="#xs-injectables-links-module-AngularPaginatorModule-81bf3d5af84a1b6af153bc508071e6ef"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-AngularPaginatorModule-81bf3d5af84a1b6af153bc508071e6ef"' : 'id="xs-injectables-links-module-AngularPaginatorModule-81bf3d5af84a1b6af153bc508071e6ef"' }>
                                        <li class="link">
                                            <a href="injectables/AngularPaginatorService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>AngularPaginatorService</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#pipes-links-module-AngularPaginatorModule-81bf3d5af84a1b6af153bc508071e6ef"' : 'data-target="#xs-pipes-links-module-AngularPaginatorModule-81bf3d5af84a1b6af153bc508071e6ef"' }>
                                    <span class="icon ion-md-add"></span>
                                    <span>Pipes</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="pipes-links-module-AngularPaginatorModule-81bf3d5af84a1b6af153bc508071e6ef"' : 'id="xs-pipes-links-module-AngularPaginatorModule-81bf3d5af84a1b6af153bc508071e6ef"' }>
                                        <li class="link">
                                            <a href="pipes/AngularPaginatorPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AngularPaginatorPipe</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AppModule-97cdc5b294aeab4081c4ac69492e758b"' : 'data-target="#xs-components-links-module-AppModule-97cdc5b294aeab4081c4ac69492e758b"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AppModule-97cdc5b294aeab4081c4ac69492e758b"' : 'id="xs-components-links-module-AppModule-97cdc5b294aeab4081c4ac69492e758b"' }>
                                        <li class="link">
                                            <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
            </ul>
        </li>
                <li class="chapter">
                    <div class="simple menu-toggler" data-toggle="collapse"
                        ${ isNormalMode ? 'data-target="#injectables-links"' : 'data-target="#xs-injectables-links"' }>
                        <span class="icon ion-md-arrow-round-down"></span>
                        <span>Injectables</span>
                        <span class="icon ion-ios-arrow-down"></span>
                    </div>
                    <ul class="links collapse"
                    ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                            <li class="link">
                                <a href="injectables/AppService.html" data-type="entity-link">AppService</a>
                            </li>
                    </ul>
                </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
                ${ isNormalMode ? 'data-target="#interfaces-links"' : 'data-target="#xs-interfaces-links"' }>
                <span class="icon ion-md-information-circle-outline"></span>
                <span>Interfaces</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                    <li class="link">
                        <a href="interfaces/AngularPaginatorInstance.html" data-type="entity-link">AngularPaginatorInstance</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/Page.html" data-type="entity-link">Page</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"' }>
                <span class="icon ion-ios-cube"></span>
                <span>Miscellaneous</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                    <li class="link">
                      <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                    </li>
            </ul>
        </li>
    </ul>
</nav>`);
        this.innerHTML = tp.strings;
    }
});
