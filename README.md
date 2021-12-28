# Angular Boilerplate

Angular starter for enterprise-grade front-end projects, built under a clean architecture
that helps to scale and maintain a fast workflow.

## Coding Standards

Coding Standards for Angular.

### Styles

-   All styling utility classes (like margin, padding etc.) must be defined in [utilities.scss](src/app/_styles/utilities.scss) file.

-   Color related utilities (like text-primary etc.) are separated from other utilities. They must be defined in color-utilities mixin in [color.utilities.scss](src/app/_styles/color.utilities.scss) file.

-   All font files should be added in [assets/fonts](src/assets/fonts) folder and font-face must be defined in [fonts.scss](src/app/_styles/fonts.scss) file.

-   To override Material Component styles, classes must be defined in [material-components.styles.scss](src/app/_styles/material-components.styles.scss) file .

-   Mixins defined in componnts must be included in custom-component mixin in [custom-components.styles.scss](src/app/_styles/custom-components.styles.scss) file.

### Themes

-   Create all Theme Pallettes in [src/app/\_themes](src/app/_themes) folder.

-   Create classes for each theme in [themes.scss](src/app/_themes/themes.scss) file.

-   In each class add

    -   angular-material-theme mixin
    -   color-utilities mixin
    -   material-components-style mixin
    -   custom-components-style mixin

-   If you need to add custom typography in mat-core, import fonts.scss file in [typography.scss](src/app/_themes/typography.scss) file and define custom-typography there.

### Modules and Component

-   Define Modules inside [app/modules](src/app/modules) folder.

-   Each component must belong to some module.

-   Shared modules and components can be defined in [app/\_shared/modules](src/app/_shared/modules) and [app/\_shared/components](src/app/_shared/components) folder respectively.

### Component HTML Standards

-   Use container classes for each major block.

-   Add classes in each div.

-   Use id only if absolutely necessary.

-   Add comments before each major block.

-   Use utility classes wherever possible.

-   For reference, check [app.component.html](src/app/app.component.html) file.

### Component SCSS Standards

-   Define mixins only if absolutely necessary and they should be at the top of the file.
-   For reference, check [app.component.scss](src/app/app.component.scss) file.

### Component TS Standards

-   Define private members at the top in the class. Add \_ before their name to separate from other members.

-   Define members (which are objects) at the bottom after all other members have been defined.

-   Add empty line while defining members of a class to create separation between different types of members.

-   Do not define any logic or code in constructor or ngHooks. Only call functions in it for better readability.

-   All ngHooks must be defined after constructor and before any other function.

-   All subscriptions must be handled in subscribeEvents() (which will be called in ngOnInit()) and they must be unsubscribed in unsubscribeEvents() (which will be called in ngOnDestroy()).

-   Define private methods at the top but after ngHooks. Add \_ before their name to separate from other methods.

-   Add documentation before each function and define it's purpose and params.

-   For reference, check [app.component.ts](src/app/app.component.ts) file.
