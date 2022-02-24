---
title: 'Loading, Querying, Joining, and Filtering Data using pandas'
part: 2
date: '2022-02-23'
categories: [data science]
tags: [python]
source: [coursera]
---

# Loading, Querying, Joining, and Filtering Data using pandas 

## pandas

`pandas` is a library that provides a lot of data analysis functionality.

### Loading data

`pandas` allows you to interact with databases and Excel files.

Here's how you'd load an Excel file:

```py
import pandas as pd
xls = pd.ExcelFile('file.xlsx')
df = xls.parse('sheet_name') # creates a DataFrame for a specific sheet
```

### Inspecting data

Here are some useful attributes and methods to give you details about your data:

```py
len(df) # number of rows
df.shape # size of rows and columns
df.count() # count of values in each column
df.columns # access column headers
df.dtypes # view data types for each column

df.describe() # built-in summary statistics for numerical values
df.head() # first 5 rows
df.head(100) # first 100 rows

df = df.drop_duplicates() # removes all duplicate rows (ALL cells identical)
```

### Querying data

Here are some useful operations to query data:

```py
df["column_name"] # returns column value for every row

atts = ["col1", "col2", "col3"]
df[atts] # returns specified column values for every row
```