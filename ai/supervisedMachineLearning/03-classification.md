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

**Problem**: Applying the same squared error cost function $J$ to a logistic regression model produces a _non-convex_, "wiggly" function, leading to multiple local minima where gradient descent can get stuck.

![](./assets/week-03/squared-error-cost-function-non-convex.png)

**Proposal**: We need a _new_ cost function that is actually convex for logistic regression, so gradient descent works nicely.

### New cost function using logistic loss function

Recall the original squared error cost function used in linear regression:

$$
J(\vec{w}, b) = \frac{1}{m} \cdot \sum_{i = 1}^{m} \ \frac{1}{2} (f_{\vec{w}, b}(\vec{x}^{(i)}) - y^{(i)})^2
$$

**Note**: Each term in the summation represents the **loss** for training example $i$. That is, it represents how far off the model is from its target for training example $i$.

Let loss function $L$ represent the loss for each training example $i$.

To create our new cost function for logistic regression, we are going to define our own **logistic loss function** $L$ as follows:

$$
L(f_{\vec{w}, b}(\vec{x}^{(i)}), y^{(i)}) =
\begin{cases}
    -\log(f_{\vec{w}, b}(\vec{x}^{(i)})) & \text{if } y^{(i)} = 1 \\
    -\log(1 - f_{\vec{w}, b}(\vec{x}^{(i)})) & \text{if } y^{(i)} = 0
\end{cases}
$$

> Depending on the target label $y^{(i)}$, we measure the loss differently.

When $y^{(i)} = 1$, a prediction that's closer to $1$ approaches a loss of $0$, while a prediction that's closer to $0$ approaches a loss of $\infty$.

![](./assets/week-03/logistic-loss-function-y-equals-1.png)

> y-axis represents loss, and x-axis represents the value of the $\log$.

We have analogous behaviour when $y^{(i)} = 0$ as well:

![](./assets/week-03/logistic-loss-function-y-equals-0.png)

**Note**: In both cases, we strongly incentivize the model to make a prediction $f_{\vec{w}, b}(\vec{x}^{(i)})$ that's as close to the true label $y^{(i)}$ as possible—or else suffer big losses.

**Importance**: The logistic loss function paves the way to a new cost function that is convex (though proving convexity is out of scope of this course).

Here's the new **logistic cost function**:

$$
J(\vec{w}, b) = \frac{1}{m} \cdot \sum_{i = 1}^{m} \ [L(f_{\vec{w}, b}(\vec{x}^{(i)}), y^{(i)})]
$$

### Simplifying logistic loss function and new cost function

Simplified logistic loss function that avoids branching cases:

$$
L(f_{\vec{w}, b}(\vec{x}^{(i)}), y^{(i)}) = -y^{(i)} \log(f_{\vec{w}, b}(\vec{x}^{(i)})) - (1 - y^{(i)})\log(1 - f_{\vec{w}, b}(\vec{x}^{(i)}))
$$

> When $y^{(i)} = 1$, the right term zeroes out. When $y^{(i)} = 0$, the left term zeroes out.

Taking this simplified logistic loss function, we derive our simplified logistic cost function:

$$
\begin{align*}
    J(\vec{w}, b) &= \frac{1}{m} \cdot \sum_{i = 1}^{m} \ [L(f_{\vec{w}, b}(\vec{x}^{(i)}), y^{(i)})] \\
    &= \frac{1}{m} \cdot \sum_{i = 1}^{m} \ [-y^{(i)} \log(f_{\vec{w}, b}(\vec{x}^{(i)})) - (1 - y^{(i)})\log(1 - f_{\vec{w}, b}(\vec{x}^{(i)}))] \\
    &= -\frac{1}{m} \cdot \sum_{i = 1}^{m} \ [y^{(i)} \log(f_{\vec{w}, b}(\vec{x}^{(i)})) + (1 - y^{(i)})\log(1 - f_{\vec{w}, b}(\vec{x}^{(i)}))]
\end{align*}
$$

This is the final expression of the logistic cost function that pretty much everyone uses to train logistic regression models!

> **Fun fact**: The origins of this cost function comes from statistics—namely the idea of maximum likelihood estimation, which is a method for efficiently finding the parameters of different models.

## Gradient Descent for Logistic Regression

The gradient descent algorithm for logistic regression is identical to that of linear regression—with the exception that model $f$ is the sigmoid function instead of a linear function.

Concepts/techniques that work the same:

- Vectorization to speed up gradient descent
- Feature scaling to speed up gradient descent
- Monitoring gradient descent to ensure it converges

## The Problem of Overfitting

### Underfitting and overfitting

When it comes to how well a model fits a training set, we have a spectrum:

1. Underfit (or high bias)
2. Just right (or generalizes well)
3. Overfit (or high variance)

![](./assets/week-03/underfitting-and-overfitting-linear-regression.png)

![](./assets/week-03/underfitting-and-overfitting-logistic-regression.png)

> Spectrum for both linear and logistic regression. Notice that a straight line underfits, a quadratic curve fits just right, and a wiggly curve due to higher-order polynomials overfits.

(1) When a model doesn’t fit its training set very well, we call this **underfitting** or **high bias**.

> "High bias" comes from the idea that the model has a mistaken preconception/assumption that causes it to badly fit the training set.

(2) When a model fits its training set pretty well, it exhibits the quality of **generalization**: given a brand new training example that it's never seen before, it tends to make a good prediction.

(3) When a model fits its training set _too well_—maybe even fitting every training example perfectly with zero cost—we call this **overfitting** or **high variance**.

**Why overfitting is a problem**: A learning algorithm may try too hard to fit all of the training examples that the model it produces becomes too sensitive to variations in the training set. This leads to a model that _lacks generalization_.

> "High variance" comes from the idea that if two ML engineers were working with two slightly different training sets, the learning algorithm would generate completely different models that give highly variable predictions.

**Goal**: Find a model that is "just right"—that neither underfits nor overfits its training examples—so that it generalizes well for new examples.

### Ways to address overfitting

### Ways to address underfitting
