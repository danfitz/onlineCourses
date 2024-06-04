---
title: 'Classification'
part: 3
date: '2024-05-27'
categories: [ai]
tags: []
source: [coursera]
---

In this module, we will learn the other type of supervised learning: classification.

Topics of this week's module:

- Binary classification using the logistic regression model
  - What is this model, and how does it work?
  - How do we train this model?
- The problem of overfitting and using a method called regularization to solve it

## Classification with Logistic Regression

### What is binary classification?

**Binary classification** is a task where the goal is to categorize data into one of two classes/categories: a **positive class** (yes, true, 1) and a **negative class** (no, false, 0).

### The problem with classification via linear regression

Suppose we have a training set that plots tumors as either benign (0) or malignant (1) using the vertical axis:

![](./assets/week-03/training-set-graph.png)

Now suppose we apply linear regression on this training set, using a threshold of $0.5$ to set a **decision boundary** (more on this later). That is, if $f(x) \geq 0.5$, we classify the training example as $1$. While if $f(x) < 0.5$, we classify the training example as $0$.

Suppose now that we add a new training example to the far right. Running linear regression on this new training set, we get a new line, leading to a decision boundary that shifts to the right.

**Problem**: As a result, we obtain _new_ classifications—even though we wouldn't expect the introduction of a new training example to change classifications of existing training examples.

![](./assets/week-03/linear-regression-example-problem.png)

> The blue line illustrates when linear regression works, while the green line illustrates when it doesn't.

### Logistic regression

**Logistic regression** fits an s-shaped curve to a binary classification training set:

![](./assets/week-03/training-set-graph-s-shaped-curve.png)

To create this s-shaped curve, we need a function that accepts features as inputs and then outputs $0 \leq y \leq 1$.

Enter the **sigmoid function** or **logistic function**:

![](./assets/week-03/sigmoid-function.png)

- When $z$ is a very large negative number, $g(z)$ approaches $0$
- When $z$ is a very large positive number, $g(z)$ approaches $1$
- When $z = 0$, $g(z) = \frac{1}{2} = 0.5$

To produce the logistic regression model, we simply pass the output of the linear regression formula to the logistic function:

$$
\begin{align*}
    z &= \vec{w} \cdot \vec{x} + b \tag{linear regression} \\
    \\
    f_{\vec{w}, b}(\vec{x}) &= g(z) \tag{logistic regression} \\
    & = g(\vec{w} \cdot \vec{x} + b) \\
    &= \frac{1}{1 + e^{-(\vec{w} \cdot \vec{x} + b)}}
\end{align*}
$$

**Pro tip**: The way to interpret the logistic regression model $f$ is that it outputs the probability that, given the features as inputs, the output $y = 1$, i.e., is a positive class.

Formally, that's why logistic regression is sometimes written as

$$
\begin{align*}
    f_{\vec{w}, b}(\vec{x}) = P(y = 1 ~|~ \vec{x}; \vec{w}, b)
\end{align*}
$$

> The RHS is read as, "the probability that $y = 1$ given the features $\vec{x}$ and parameters $\vec{w}, b$".

### Decision boundary

A **threshold** is a constant $t \in [0,1]$ that serves as a boundary between whether the probability output of the logistic regression model belongs to prediction $\hat{y} = 1$ or $\hat{y} = 0$.

Namely,

- if $f_{\vec{w}, b}(\vec{x}) \geq t$, then $\hat{y} = 1$, and
- if $f_{\vec{w}, b}(\vec{x}) < t$, then $\hat{y} = 0$.

**Note**: A very common threshold is $0.5$.

**Question**: Given a threshold of $0.5$, when is $\hat{y} = 1$, and when is $\hat{y} = 0$?

**Answer**:

- Recall that $f_{\vec{w}, b}(\vec{x}) = g(z)$
- $\hat{y} = 1$ when $g(z) \geq 0.5$, which occurs when $z \geq 0$ (see sigmoid function graph above to verify)
- Recall also that $z = \vec{w} \cdot \vec{x} + b$
- $\therefore$ $\hat{y} = 1$ exactly when $\vec{w} \cdot \vec{x} + b \geq 0$

> Analogous reasoning applies when we say that $f_{\vec{w}, b}(\vec{x}) < 0.5$ and thus $\hat{y} = 0$ exactly when $z < 0$.

Given some defined parameters $\vec{w}$ and $b$, a **decision boundary** represents the set of points where $z = \vec{w} \cdot \vec{x} + b$ _exactly_ meets the threshold. (In the case of threshold $0.5$, this occurs when $z = 0$.)

For example, consider a training set with features $x_1$ and $x_2$ along with parameters set to $w_1 = w_2 = 1$ and $b = -3$.

![](./assets/week-03/decision-boundary-example.png)

> The decision boundary in our example is $x_1 + x_2 = 3$.

**Note**: As long as the degree of $z$ is $1$, the decision boundary will always be a line. However, using higher-order polynomials (i.e., degree of $z$ is $> 1$), we can create non-linear decision boundaries that fit more complex training sets.

![](./assets/week-03/non-linear-decision-boundary-examples.png)

## Cost Function for Logistic Regression

### The problem with squared error cost function

Recall that the squared error cost function $J(\vec{w}, b)$ is a convex function, making gradient descent naturally converge on a global minimum.

**Problem**: Applying the same squared error cost function $J$ to a logistic regression model produces a _non-convex_ function, leading to multiple local minima where gradient descent can get stuck.

**Proposal**: We need a different cost function that is actually convex, so gradient descent works nicely.

### New cost function

Recall the original squared error cost function in linear regression:

$$
J(\vec{w}, b) = \frac{1}{m} \cdot \sum_{i = 1}^{n} \ \frac{1}{2} (f_{\vec{w}, b}(\vec{x}^{(i)}) - y^{(i)})^2
$$

**Note**: Each term in the summation represent how well the model is doing on a specific training example $i$.

Let loss function $L(f_{\vec{w}, b}(\vec{x}^{(i)}), y^{(i)})$ represent the loss for each training example $i$.

To create our new cost function, we are going to define a _logistic_ loss function $L$ as follows:

$$
L(f_{\vec{w}, b}(\vec{x}^{(i)}), y^{(i)}) =
\begin{cases}
    -\log(f_{\vec{w}, b}(\vec{x})) & \text{if } y^{(i)} = 1 \\
    -\log(1 - f_{\vec{w}, b}(\vec{x})) & \text{if } y^{(i)} = 0
\end{cases}
$$

> Depending on the target label $y^{(i)}$, we measure the loss differently.

In both cases, we strongly incentivize the model to predict an output $f(\vec{x})$ that's close to the true label $y$.

That's because being as close as possible to the true label $y$ approaches zero loss. Whereas being as far as possible from the true label $y$ approaches $\infty$ loss.

<Add graphs showing how this works>

9:30

## Gradient Descent for Logistic Regression

## The Problem of Overfitting
