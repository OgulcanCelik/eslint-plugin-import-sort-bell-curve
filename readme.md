# eslint-plugin-import-sort-bell-curve
This ESLint plugin enforces a bell-curve style sort order for import statements. I don't know why anyone would want to use it, but here it is.

Inspired by: https://x.com/mikenikles/status/1706726764293374051

Installation
Install the plugin:

```bash
npm install eslint-plugin-import-sort-bell-curve --save-dev
```
Usage
Add `import-sort-bell-curve/sort-imports-bell-curve` to the plugins section of your .eslintrc configuration file:

```json
{
  "plugins": ["import-sort-bell-curve"]
}
```
Then add the rule:

```json
{
  "rules": {
    "import-sort-bell-curve/sort-imports-bell-curve": "error"
  }
}
```

Example

Given the following import statements:

```javascript
import React, { useEffect, useCallback, useMemo, Fragment } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { groupBy, orderBy } from "lodash";
import _flatten from "lodash/flatten";
import _sortBy from "lodash/sortBy";

import { AppState } from "@src/redux/store";
import { TransactionsActions } from "@src/redux/actions";
import { userSelectors } from "@src/redux/selectors";
import dayjs from "@src/wrappers/dayjs";

import IconLinkButton from "../common/buttons/IconLinkButton/IconLinkButton";
import { RefreshIcon } from "../common/svgs";
import "./i18n";
```
This plugin will automatically sort them as:

```javascript
import "./i18n";
import _sortBy from "lodash/sortBy";
import dayjs from "@src/wrappers/dayjs";
import { AppState } from "@src/redux/store";
import { useTranslation } from "react-i18next";
import { userSelectors } from "@src/redux/selectors";
import { TransactionsActions } from "@src/redux/actions";
import React, { useEffect, useCallback, useMemo, Fragment } from "react";
import IconLinkButton from "../common/buttons/IconLinkButton/IconLinkButton";
import { useDispatch, useSelector } from "react-redux";
import { RefreshIcon } from "../common/svgs";
import { groupBy, orderBy } from "lodash";
import _flatten from "lodash/flatten";
```