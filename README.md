# twin-dashboard


## Project setup
```
npm install
```

## Data import
/import/import.ipynb is a python notebook that imports a given dataset to the remote database. The "table" variable in the script corresponds to the "table" parameter that is set n the URL (see below).

The script requires three input csv files, an example sample of them can be previewed [here](https://docs.google.com/spreadsheets/d/1QhjE27TJ-AiFbC4pea39ajy_l-iAAVDUKoBIDMpoMFE/edit#gid=317635195). All files and the required columns must be present for a successful import.

**_data.csv** represents the dataset that will be uploaded, it requires the following columns:
- ``date``: any parseable date format (e.g., ``23-11-1988``)
- ``weight`` (numeric): value of weight, higher values have impact on the confidence representation (line thickness)
- ``metric_*`` (numeric, multiple): metric element, e.g., ``metric_score`` with value ``5``
- ``filter_*`` (string, multiple): filter element, e.g., ``filter_company`` with value ``nokia``


**_display.csv** configures the display properties of the dataset, it requires the following columns:
- ``key`` (String):  corresponds to ``*metric_**`` and ``*filter_*``, values must be a complete list of used metrics and filters, e.g. ``metric_score`` or ``filter_company``
- ``display`` (String): sets the display name of these metrics, e.g. ``Overall Score``.
- If two filter properties have different keys (e.g. ``filter_country`` and ``filter_city``), but the same display name (e.g. "Location"), they will be merged.
- ``metric_low_end``, ``metric_high_end`` (numeric): Domain of the y-axis when displaying this metric (only applies to ``metric_*`` rows; NULL for ``filter_*`` rows)
- ``text_title`` (String): h1 of the website, defaults to "Open Inc" if not set
- ``text_intro`` (String, HTML): <p> below the title, will not be displays if not set
- ``text_description`` (String, HTML): Paragraph below event, will not be displays if not set

**_events.csv**: data for events that are shown as lines within the chart and text below it. Events with identical dates will be combined in one line.  requires the following columns:
- ``date``: any parseable date format (e.g., ``23-11-1988``)
- ``filter`` (String): corresponds to ``filter_*``, limits the display of this event to ONE active filter (e. g. ``filter_company``, no multiple selection possible). If left blank, the event will be displayed globally
- ``text`` (String): Event text, <html> formatting is possible.




### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### URL parameters
The current state of the visualization can be shared by sharing the URL. It contains the following parameters:
- ``table``: table from mysql-db, corresponds to import variable (default: ``table=example``)
- ``granularity``: data aggregation level, day, week, month or year (default: ``granularity=month``)
- ``period``: pre-select time-period (``YYYY-MM-DD``), start and end date comma-separated (e.g., ``period=1999-01-01,2011-12-31``)
- ``metric``: selected metric (default: first one in db)
- ``lines``: number of lines to display (default: ``1``)
- ``filter_*``: active filters (unique to each table), comma separated for each line (e.g., ``filter_company=huawei,nokia``)


### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
