# AgGridSsrm

This repository should demonstrate my issue with AG Grid with the usage of the Server Side Row Model.

It should demonstrate the issue of the sort model being empty as soon as the pivot mode gets enabled.
When the pivot mode is disabled, changed the sort direction of the columns leads to the `getRows` being invoked as expected with the updated sortModel.

As soon as the pivot mode is enabled, the sort model is always empty on the request params.
Also, changing the sort order gets reflected in the UI, but the `getRows` callback does not get invoked.

You can also see that accessing the columns which have sorting in place via the column api gives the correct, expected results.
This can be seen when pivoting is enabled and the columns are used for grouping or pivoting.
The sort model holds an empty array, but the column api query returns the columns which have sorting enabled.

Please note that in our actual application, the pivoting result does return actual pivoting columns and still hsa the same issue, that's why I would guess there must be an issue internally or we are missing some important piece of configuration or knowledge how to handle pivoting correctly.
