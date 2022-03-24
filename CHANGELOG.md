# ChangeLog

## Version 2.1.0

Android 12 support

## Version 2.0.0

The `title` prop has been replaced by the localisation options.

A `theme` prop has been added. It can be used to change the look and feel of the button.

### Migration Guide
It is recommended to select a theme in order to have the most control over the appearance and behaviour of the button.
If you opt to use the default partnership theme, it is recommended the button be placed beneath any other buttons in your layout.
A height of 72pt should be used for the partnership theme and at least 44pt for the other themes.
In addition to this, at least 300pt width should accommodate the default English language text.

Update your app's `Info.plist` to include `easyid` in the `LSApplicationQueriesSchemes`.
