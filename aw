[33mcommit 5ebee6c07f4d6e1ef660bcd4ae1c90624d864b54[m[33m ([m[1;36mHEAD -> [m[1;32mmain[m[33m, [m[1;31morigin/main[m[33m, [m[1;31morigin/HEAD[m[33m)[m
Author: DevVatu <devvatu@gmail.com>
Date:   Fri Jul 9 15:01:51 2021 +0200

    UI improvements

:100644 100644 f29f5c6 1e904ed M	comps/Header/Header.js
:100644 100644 6f7c31c 0efae88 M	public/sw.js
:100644 100644 51ef25f f57accd M	styles/Header/Header.module.scss
:100644 100644 99820b2 46ed5a8 M	styles/ItemsList/ListItem.module.scss
:100644 100644 7e0cc79 2a308ef M	styles/globals.scss

[33mcommit e8b00ce52ca7421003252cccf6604cc6f19bb6d8[m
Author: DevVatu <devvatu@gmail.com>
Date:   Thu Jul 8 20:20:03 2021 +0200

    fixed cls issue (thanks god, huhh!)

:100644 100644 708a5c5 aa35344 M	pages/_app.js
:100644 100644 357e57a 6f7c31c M	public/sw.js
:100644 000000 cd67815 0000000 D	public/sw.js.map
:100644 000000 41d3533 0000000 D	public/workbox-6b19f60b.js
:100644 000000 c0d0a8f 0000000 D	public/workbox-6b19f60b.js.map
:000000 100644 0000000 2ac91a3 A	public/workbox-ea903bce.js
:000000 100644 0000000 8e0b00a A	styles/Settings/SettingDetail.module.css

[33mcommit 086a77a1e1b6f1100b24f0fdae01bdaaba15827c[m
Author: DevVatu <devvatu@gmail.com>
Date:   Thu Jul 8 18:24:20 2021 +0200

    added motion to settings + maybe CLS issue solved

:100644 100644 2d13de2 9fe33c5 M	pages/auth/create_settings.jsx
:100644 100644 b6a814d f7e29e8 M	pages/index.js
:100644 100644 bb24c0c 246ffb1 M	pages/settings/current.jsx
:100644 100644 0ec87d9 c8b37f4 M	pages/settings/expense.jsx
:100644 100644 6aba65c 8ca93c9 M	pages/settings/income.jsx
:100644 100644 02aad7c 0dd2658 M	pages/settings/index.js
:100644 100644 d512980 1ccce3e M	pages/transactions/[id].jsx
:100644 100644 634cabb 1cc9164 M	pages/transactions/new.jsx
:100644 100644 4e16ad8 cd67815 M	public/sw.js.map

[33mcommit 17c5cdfb2848d42aa7a8b0abeb2514521db8badc[m
Author: DevVatu <devvatu@gmail.com>
Date:   Thu Jul 8 16:20:31 2021 +0200

    styled setting[detail] pages

:100644 100644 6e4a144 dbc290e M	comps/Filters/Filters.jsx
:100644 100644 7c194eb 2d13de2 M	pages/auth/create_settings.jsx
:100644 100644 6ec6b34 bb24c0c M	pages/settings/current.jsx
:100644 100644 77a19ca 0ec87d9 M	pages/settings/expense.jsx
:100644 100644 b5298fe 6aba65c M	pages/settings/income.jsx
:100644 100644 62a1634 4e16ad8 M	public/sw.js.map
:000000 100644 0000000 1e71bf1 A	styles/Settings/SettingDetail.module.scss
:100644 100644 ac7e5a1 f92c78b M	styles/auth/CreateSettings.module.scss
:100644 100644 dc6e089 ba82e05 M	styles/auth/Login.module.scss
:100644 100644 1e127be a96b939 M	styles/auth/Register.module.scss
:100644 100644 8d9eae9 7e0cc79 M	styles/globals.scss
:100644 100644 5ef57af 288c4a1 M	styles/utility/variables.scss

[33mcommit 8b0e847b94189802c9e3e80a12c1c3e204686160[m
Author: DevVatu <devvatu@gmail.com>
Date:   Thu Jul 8 07:56:29 2021 +0200

    improved create_settings page

:100644 100644 96a9a20 7c194eb M	pages/auth/create_settings.jsx
:100644 100644 653a318 62a1634 M	public/sw.js.map
:000000 100644 0000000 ac7e5a1 A	styles/auth/CreateSettings.module.scss

[33mcommit ab0b1dc974feec3edc9299f06a7ab42f5cac4302[m
Author: DevVatu <devvatu@gmail.com>
Date:   Wed Jul 7 21:58:49 2021 +0200

    added auth validation + logical improvements (create_settings needs some design)

:100644 100644 693884e e0dd9e0 M	comps/AddItem/AddItem.js
:000000 100644 0000000 5f6e7a3 A	comps/ContextWrapper.jsx
:100644 100644 0f14894 f29f5c6 M	comps/Header/Header.js
:100644 100644 27a494d cb206d8 M	comps/ItemList/ListItem.jsx
:100644 100644 ce73179 74c0345 M	context/budgetContext.js
:100644 100644 0a3a530 708a5c5 M	pages/_app.js
:100644 100644 e61022e f97d06d M	pages/auth/login.jsx
:100644 100644 77c7674 27be552 M	pages/auth/register.jsx
:100644 100644 0b78097 b6a814d M	pages/index.js
:100644 100644 e3102b0 6ec6b34 M	pages/settings/current.jsx
:100644 100644 795cfaf 77a19ca M	pages/settings/expense.jsx
:100644 100644 aa278b2 b5298fe M	pages/settings/income.jsx
:100644 100644 7c55cfc 02aad7c M	pages/settings/index.js
:100644 100644 b2bf2d7 d512980 M	pages/transactions/[id].jsx
:100644 100644 5174d66 634cabb M	pages/transactions/new.jsx
:100644 100644 62ba5a5 653a318 M	public/sw.js.map
:100644 100644 1e08369 dc6e089 M	styles/auth/Login.module.scss
:100644 100644 7deea02 1e127be M	styles/auth/Register.module.scss
:100644 100644 befc770 5ef57af M	styles/utility/variables.scss

[33mcommit 89daba996880cfdf6a987867bfe055848411e015[m
Author: DevVatu <devvatu@gmail.com>
Date:   Wed Jul 7 16:41:16 2021 +0200

    added formik

:100644 100644 64e3844 e61022e M	pages/auth/login.jsx
:100644 100644 9c61d51 77c7674 M	pages/auth/register.jsx
:100644 100644 6aa7ea9 62ba5a5 M	public/sw.js.map
:100644 100644 e287c0b 8d9eae9 M	styles/globals.scss

[33mcommit 9f178e0fb8f1dd1cbba944748e7be16caeaeadb8[m
Author: DevVatu <devvatu@gmail.com>
Date:   Wed Jul 7 15:56:31 2021 +0200

    further ui improvment and samallbug fixes

:100644 100644 9633f07 0f14894 M	comps/Header/Header.js
:100644 100644 741e9ce 27a494d M	comps/ItemList/ListItem.jsx
:100644 100644 e78994e 9fd2d5f M	comps/Total/progress/Circular.jsx
:000000 100644 0000000 ce73179 A	context/budgetContext.js
:100644 100644 c75d34b 7e12436 M	package-lock.json
:100644 100644 eeaa317 176b2b0 M	package.json
:100644 100644 09e2b6e 0a3a530 M	pages/_app.js
:100644 100644 8d12566 0b78097 M	pages/index.js
:100644 100644 08ffd35 7c55cfc M	pages/settings/index.js
:100644 100644 53ab5f8 b2bf2d7 M	pages/transactions/[id].jsx
:100644 100644 07ff05e 6aa7ea9 M	public/sw.js.map
:100644 100644 ec8e4c8 6aa3d94 M	styles/Total/Circular.module.scss
:100644 100644 e581308 befc770 M	styles/utility/variables.scss

[33mcommit b4482574453d2ea7d3b862b42f625c3c123867af[m
Author: DevVatu <devvatu@gmail.com>
Date:   Wed Jul 7 12:34:05 2021 +0200

    fixed typo at create_settings.jsx

:100644 100644 442045c 96a9a20 M	pages/auth/create_settings.jsx
:100644 100644 3949197 07ff05e M	public/sw.js.map

[33mcommit dab5531414c25b838b5ae747c17fffc49f044cb3[m
Author: DevVatu <devvatu@gmail.com>
Date:   Wed Jul 7 11:27:06 2021 +0200

    added logout to setting + small ui improvements

:100644 100644 e4a6497 6e4a144 M	comps/Filters/Filters.jsx
:100644 100644 19e8b7b 9633f07 M	comps/Header/Header.js
:100644 100644 b71f71e 741e9ce M	comps/ItemList/ListItem.jsx
:100644 100644 352fe5f 088ba21 M	comps/SettingCard/SettingLink.jsx
:100644 100644 20f8331 442045c M	pages/auth/create_settings.jsx
:100644 100644 017332e 64e3844 M	pages/auth/login.jsx
:100644 100644 82e6b34 9c61d51 M	pages/auth/register.jsx
:100644 100644 4547e5c 8d12566 M	pages/index.js
:100644 100644 748c42d 08ffd35 M	pages/settings/index.js
:100644 100644 1290aed 53ab5f8 M	pages/transactions/[id].jsx
:100644 100644 fbdbe9a 5174d66 M	pages/transactions/new.jsx
:100644 100644 4633377 3949197 M	public/sw.js.map
:100644 100644 143cda2 d17bdcd M	styles/AddItem/AddItem.module.scss
:100644 100644 698a443 fd4ff2c M	styles/Filters/Filters.module.scss
:100644 100644 4a85650 51ef25f M	styles/Header/Header.module.scss
:100644 100644 fc9c0bd 55705a3 M	styles/Settings/SettingLink.module.scss
:100644 100644 d9a5e29 1e08369 M	styles/auth/Login.module.scss
:100644 100644 c47348c cc9ce5c M	styles/controls/Button.module.scss
:100644 100644 b32cb12 bd0772e M	styles/controls/Input.module.scss
:100644 100644 0bb8aff e581308 M	styles/utility/variables.scss

[33mcommit 6e323bb3560d406365eef0a9244cd7abcc78f329[m
Author: DevVatu <devvatu@gmail.com>
Date:   Tue Jul 6 22:51:00 2021 +0200

    login fetch issue solved

:100644 100644 bea619d 017332e M	pages/auth/login.jsx

[33mcommit 593720dba1833aae6ccf6cb760186893262111aa[m
Author: DevVatu <devvatu@gmail.com>
Date:   Tue Jul 6 22:47:51 2021 +0200

    API_URL modified

:100644 100644 288d844 20f8331 M	pages/auth/create_settings.jsx
:100644 100644 79003e7 bea619d M	pages/auth/login.jsx
:100644 100644 89cced5 82e6b34 M	pages/auth/register.jsx
:100644 100644 d662393 4547e5c M	pages/index.js
:100644 100644 705853f e3102b0 M	pages/settings/current.jsx
:100644 100644 773ada4 795cfaf M	pages/settings/expense.jsx
:100644 100644 0265ffe aa278b2 M	pages/settings/income.jsx
:100644 100644 fd5774c 1290aed 