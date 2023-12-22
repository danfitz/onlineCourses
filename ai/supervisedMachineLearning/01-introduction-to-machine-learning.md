---
title: 'Introduction to Machine Learning'
part: 1
date: '2023-12-20'
categories: [ai]
tags: []
source: [coursera]
---

## Goals of course

This course will teach you

1. the machine learning algorithms, and
2. practical advice on when and how to _apply_ them.

Just like how you can't just build a house by learning how to use a hammer and a drill, you can't build machine learning systems just by learning the algorithms.

That's why this course spends a lot of time on _application_.

## What is Machine Learning?

Machine learning definition:

> "Field of study that gives computers the ability to learn without being explicitly programmed."
>
> — Arthur Samuel (1959)

There are 4 types of machine learning:

- Supervised learning
- Unsupervised learning
- Recommender systems
- Reinforcement learning

Supervised learning is used _most_ in real-world applications. Additionally, it's seen the most rapid advancements.

Courses 1 and 2 focus on supervised learning, while course 3 focuses on the rest.

## Supervised vs. unsupervised learning

### Supervised learning

**Supervised learning** is a set of machine learning algorithms that learn $f(x) = y$ input-output mappings. The key way it learns these mappings is by being given _labeled data_. In other words, we provide a set of input examples, where the "right" output for each example is known upfront to teach the learning algorithm.

Eventually, the goal of the supervised learning algorithm is to learn to accept input $x$ alone and return a reasonably accurate prediction of output $y$.

**Note**: The function $f$ is the learning algorithm that you use.

One type of supervised learning algorithm is a **regression** algorithm. These algorithms are defined by the fact that they try to predict a number from _infinitely_ many possible numbers.

For example, we may have a set of house sizes (inputs) and their prices (outputs). Given this data, we build a regression algorithm that can take 750 square feet as input and output the predicted price of the house.

![](assets/housing-price-prediction-example.png)

> **Fun fact**: If you plot learning algorithm $f$ on an x-axis and y-axis, sometimes it is a straight line, sometimes a curve, or some other shape relative to the data. What shape it is depends on how you systematically _configure_ the learning algorithm.

Another type of supervised learning algorithm is a **classification** algorithm. These algorithms are defined by the fact that they try to predict a _finite small_ number of output _categories_ or _classes_ (where outputs can be non-numeric).

For example, we may have a set of tumors, where inputs are sizes and outputs are possible diagnoses of the tumors:

![](assets/breast-cancer-detection-example.png)

**Important**: It's possible to use more than one input. In practice, many machine learning algorithms use _many_ inputs.

For example, instead of just using tumor size as the only input, we can also include age as an input too.

![](assets/multiple-inputs-example.png)

> In this scenario, the learning algorithm may try to figure out a boundary line that separates benign from malignant cases.

### Unsupervised learning

**Supervised learning** is a set of machine learning algorithms that are given inputs $x$ without "right" outputs $y$. Consequently, instead of predicting outputs, the goal is to find something interesting—some structure or pattern—in the _unlabeled data_.

In our tumor example, we may only be given input data on age and tumor size for each tumor but not any diagnosis. So, instead of diagnosing the tumor, our unsupervised learning algorithm may try to _cluster_ them. This is a type of unsupervised learning known as a **clustering algorithm**.

![](assets/tumor-clustering-example.png)

Other examples of unsupervised learning in the form of clustering:

- Google clustering news articles by a shared topic
- Clustering individuals into types based on the genes they have turned on or off
- Clustering a business' customers into different market segments

Other types of unsupervised learning:

- **Anomaly detection**: Finds unusual data points
  - Example: Fraud detection
- **Dimensionality reduction**: Compresses a larger dataset into a much smaller dataset while losing as little information as possible
