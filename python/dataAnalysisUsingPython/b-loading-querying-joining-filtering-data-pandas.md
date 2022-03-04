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
# Returns column values for every row
df["column_name"]

# Returns specified column values for every row
atts = ["col1", "col2", "col3"]
df[atts]
```

### Casting data

Sometimes the data type for a DataFrame column is not what we expect. So we may need to *cast* the values into another data type.

`pd.to_numeric` method:

```py
df['salary'] = pd.to_numeric(df['salary'], errors='coerce')
# The errors argument determines how to handle data that fails casting
```

`astype` method:

```py
df['name'] = df['name'].astype(str) # casts to string
```

### Cleaning data

If your data in a column is dirty and you need to clean it up, you can use data type-related methods to mutate the values.

```py
# This example removes trailing whitespace
df['name'] = df['name'].str.strip()
```

If, on the other hand, you have missing values in a column, you can either drop those rows...

```py
df.dropna(inplace = True)
```

or you can fill in those missing values with some default.

```py
df.fillna('N/A')
```

### Joining data

Given two DataFrames, you can *join* data together based on some shared key:

```py
pd.merge(left=df1, right=df2, how="inner", left_on="key1", right_on="key2")
```

In the example above, we *inner join* (only keeps data where match is found) `df2` into `df1` using a shared key. That means the data in `df2` gets merged *into* `df1`.

### Filtering data

You can get a slice of a DataFrame's rows:

```py
second_100_rows = df[100:200]
last_row = df[-1 : len(df)-11]
last_row_again = df.iloc[-1]
```

You can also filter a DataFrame using boolean indexing:

```py
# Creates a Series containing True/False values for each row
# to determine which passes the logic check
conditionA = df["age"] >= 30
conditionB = df["city"].isin(["Toronto", "Edmonton"])

# Returns only those rows where the row was True in the Series
df[conditionA]
df[conditionB]

# Setting multiple conditions
cond1 = df["name"] = "Dan"
cond2 = df["city"] = "Toronto"
df[conditionA | conditionB] # "|" represents bitwise OR
df[conditionA & conditionB] # "&" represents bitwise AND
```

### Computing data

A column gives you access to the following methods:

```py
df["income"].sum() # returns total income
df["rating"].mean() # returns average rating
df["city"].unique() # filters out duplicates
df["city"].value_counts() # returns number of rows for each city
df["city"].nunique() # returns number of unique values?
```

### Updating/creating data

You can mutate a DataFrame by adding/updating columns:

```py
df["new_column"] = <some_value>

df["concat_column"] = df["col1"].str.concat(df["col2"], sep=",")

def add_two(x):
  return x + 2
df["amount"] = df["amount"].apply(add_two)
```