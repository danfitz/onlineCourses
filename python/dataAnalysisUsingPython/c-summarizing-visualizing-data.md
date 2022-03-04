---
title: 'Summarizing and Visualizing Data'
part: 3
date: '2022-03-02'
categories: [data science]
tags: [python]
source: [coursera]
---

# Summarizing and Visualizing Data 

## Summarizing Data

### Aggregation

`grouby` is an SQL-equivalent way to group data by the values in a column:

```py
groups = df.groupby(['city']).groups # returns GroupBy object withs groups attribute

groups['Las Vegas'] # returns all rows with "Las Vegas" as city
```

Once you have your groups, you can then perform aggregate computations on the data in each group:

```py
import numpy as np

# You pass aggregate functions to perform the aggregations (numpy has built-in ones)
df.groupby(['city']).agg([np.sum, np.mean])
```

### Pivot table

A useful approach to aggregation is via **pivot tables**: the grouping of data along some index/indices in order to show useful summaries along that index/indices.

When creating a pivot table, you are basically creating a new DataFrame from your original DataFrame:

```py
pivot_city = pd.pivot_table(df, index=["city"])
```

**Note**: By default, pandas' pivot tables aggregate via mean for all columns. But you can specify which aggregate functions you want to use and for which columns:

```py
pivot_city = pd.pivot_table(
  df,
  index=["city"],
  aggfunc=[np.sum], # aggregates via sum
  values=["review_count", "stars"] # only aggregates these columns
)

pivot_city2 = pd.pivot_table(
  df,
  index=["city"],
  # uses different aggregate methods for different columns
  aggfunc={ "review_count": np.sum, "stars": np.mean }
)
```


## Visualizing Data

To get started visualizing data, initialize a visualization tool using the following Jupyter notebook magic function:

`%pylab inline`

Loading Pylab introduces Matplotlib, a very popular data visualization tool.

### Histograms

As a recap, a **histogram** shows the distribution of values in a data set.

Here's the basic API to create histograms using Matplotlib:

```py
# Returns series containing ages for relevant cities
ages_toronto = df[df["city"] == "Toronto"]["age"]
ages_sauga = df[df["city"] == "Mississauga"]["age"]

import matplotlib.pyplot as plt

# Show overlapping histogram:
plt.hist(
  ages_toronto,
  alpha = 0.3, # opacity of bars
  color = "blue",
  label = "Toronto",
  bins = "auto" # width of dividers on x-axis
)
plt.hist(
  ages_sauga,
  alpha = 0.3, # opacity of bars
  color = "red",
  label = "Mississauga",
  bins = "auto" # width of dividers on x-axis
)

plt.xlabel("Ages")
plt.ylabel("Number of Items")
plt.legend(loc = "best") # automatic legend positioning
plt.title("Distribution of Ages in Toronto and Mississauga")

plt.show()

# Show side-by-side histogram:
plt.hist(
  [ages_toronto, ages_sauga],
  color = ["blue", "red"],
  label = ["Toronto", "Mississauga"],
  # everything else the same...
)

plt.show()
```

### Scatterplots

As a recap, a **scatterplot** shows the spread of data along 2 variables by plotting each value as a point on an x-y plane.

Here's the basic API to create scatterplots using Matplotlib:

```py
df_toronto = df[df["city"] == "Toronto"]
df_sauga = df[df["city"] == "Mississauga"]

plt.scatter(
  df_toronto["income"], # x-axis
  df_toronto["age"], # y-axis
  marker = "o", # points shaped as circles
  color = "green",
  alpha = 0.7, # opacity of points
  s = 124, # size 
  label = ["Toronto"]
)

plt.scatter(
  df_sauga["income"], # x-axis
  df_sauga["age"], # y-axis
  marker = "^", # points shaped as triangles
  color = "blue",
  alpha = 0.7, # opacity of points
  s = 124, # size 
  label = ["Mississauga"]
)

plt.xlabel("Income")
plt.ylabel("Age")
plt.legend(loc = "upper left")
plt.title("Scatter for income and age in cities")

plt.show()
```

**Pro tip**: When you have outliers in your scatterplot, it can cause all the centralized data to look squashed. For example, maybe some citizens of Toronto or Mississauga have a huge income over everyone else. To fix this, we can scale the y-axis *logarithmically*, so the y-axis increments in powers of 10 (10^1, 10^2, etc.).

```py
axes = plt.gca()
axes.set_yscale("log")
```
